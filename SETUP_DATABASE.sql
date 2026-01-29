-- MaxiPC Supabase Database Setup

-- Create reservations table
CREATE TABLE IF NOT EXISTS public.reservations (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    service VARCHAR(255) NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    description TEXT,
    confirmation_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT customer_email_check CHECK (customer_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_reservations_user_id ON public.reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON public.reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_confirmation_number ON public.reservations(confirmation_number);

-- Enable Row Level Security (RLS)
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own reservations
CREATE POLICY "Users can view their own reservations"
    ON public.reservations
    FOR SELECT
    USING (auth.uid() = user_id);

-- Users can only insert their own reservations
CREATE POLICY "Users can insert their own reservations"
    ON public.reservations
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can only update their own reservations
CREATE POLICY "Users can update their own reservations"
    ON public.reservations
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own reservations
CREATE POLICY "Users can delete their own reservations"
    ON public.reservations
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_reservations_updated_at
BEFORE UPDATE ON public.reservations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
