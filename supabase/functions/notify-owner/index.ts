// @ts-nocheck
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

type NotificationPayload = {
  eventType: 'reservation_created' | 'order_created' | string;
  payload?: Record<string, unknown>;
};

function stringify(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value);
}

function buildMessage(input: NotificationPayload): { subject: string; text: string } {
  const payload = input.payload || {};

  if (input.eventType === 'order_created') {
    const subject = 'Nouvelle commande boutique - MaxiPC';
    const text = [
      'Nouvelle commande reçue.',
      '',
      `Référence: ${stringify(payload.order_reference) || '-'}`,
      `Client: ${stringify(payload.customer_name) || '-'}`,
      `Email: ${stringify(payload.customer_email) || '-'}`,
      `Téléphone: ${stringify(payload.customer_phone) || '-'}`,
      `Total estimé: ${stringify(payload.total_estimated) || '-'}`,
      `Détails: ${stringify(payload.items_text) || '-'}`
    ].join('\n');

    return { subject, text };
  }

  const subject = 'Nouvelle réservation - MaxiPC';
  const text = [
    'Nouvelle réservation reçue.',
    '',
    `N° confirmation: ${stringify(payload.confirmation_number) || '-'}`,
    `Client: ${stringify(payload.customer_name) || '-'}`,
    `Email: ${stringify(payload.customer_email) || '-'}`,
    `Téléphone: ${stringify(payload.customer_phone) || '-'}`,
    `Service: ${stringify(payload.service) || '-'}`,
    `Date: ${stringify(payload.reservation_date) || '-'} ${stringify(payload.reservation_time) || ''}`.trim(),
    `Description: ${stringify(payload.description) || '-'}`
  ].join('\n');

  return { subject, text };
}

async function sendEmail(subject: string, text: string): Promise<{ ok: boolean; error?: string }> {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  const ownerEmail = Deno.env.get('OWNER_EMAIL');
  const fromEmail = Deno.env.get('NOTIFY_FROM_EMAIL') || 'MaxiPC Notifications <onboarding@resend.dev>';

  if (!resendApiKey || !ownerEmail) {
    return { ok: false, error: 'Missing RESEND_API_KEY or OWNER_EMAIL' };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [ownerEmail],
      subject,
      text
    })
  });

  if (!response.ok) {
    const body = await response.text();
    return { ok: false, error: `Resend error ${response.status}: ${body}` };
  }

  return { ok: true };
}

async function sendSms(text: string): Promise<{ ok: boolean; error?: string }> {
  const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
  const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
  const fromPhone = Deno.env.get('TWILIO_FROM_PHONE');
  const ownerPhone = Deno.env.get('OWNER_PHONE_E164');

  if (!accountSid || !authToken || !fromPhone || !ownerPhone) {
    return { ok: false, error: 'Missing Twilio env vars (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_PHONE, OWNER_PHONE_E164)' };
  }

  const body = new URLSearchParams({
    To: ownerPhone,
    From: fromPhone,
    Body: text.slice(0, 1200)
  });

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });

  if (!response.ok) {
    const responseText = await response.text();
    return { ok: false, error: `Twilio error ${response.status}: ${responseText}` };
  }

  return { ok: true };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const payload: NotificationPayload = await req.json();
    const { subject, text } = buildMessage(payload);

    const [emailResult, smsResult] = await Promise.all([
      sendEmail(subject, text),
      sendSms(text)
    ]);

    return new Response(
      JSON.stringify({
        success: emailResult.ok || smsResult.ok,
        email: emailResult,
        sms: smsResult
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unexpected error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
