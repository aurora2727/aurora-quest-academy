/*
  # Aurora Academy Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `avatar_url` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text) - 'general' or 'bootcamp'
      - `image_url` (text)
      - `price` (integer)
      - `duration` (text)
      - `level` (text)
      - `instructor` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `enrollments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `course_id` (uuid, references courses)
      - `enrolled_at` (timestamp)
      - `progress` (integer, default 0)
      - `completed_at` (timestamp, optional)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public course viewing
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('general', 'bootcamp')),
  image_url text,
  price integer DEFAULT 0,
  duration text,
  level text,
  instructor text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed_at timestamptz,
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Courses policies
CREATE POLICY "Anyone can view courses"
  ON courses
  FOR SELECT
  TO public
  USING (true);

-- Enrollments policies
CREATE POLICY "Users can view own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own enrollments"
  ON enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments"
  ON enrollments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert sample courses
INSERT INTO courses (title, description, category, image_url, price, duration, level, instructor) VALUES
  ('Web Development Fundamentals', 'Pelajari dasar-dasar pengembangan web dengan HTML, CSS, dan JavaScript', 'general', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6', 500000, '8 minggu', 'Pemula', 'John Doe'),
  ('React.js Complete Course', 'Kuasai React.js dari dasar hingga mahir dengan project nyata', 'general', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee', 750000, '10 minggu', 'Menengah', 'Jane Smith'),
  ('Full Stack JavaScript', 'Bootcamp intensif untuk menjadi Full Stack Developer dalam 12 minggu', 'bootcamp', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3', 2500000, '12 minggu', 'Intensif', 'Mike Johnson'),
  ('Mobile App Development', 'Pelajari pengembangan aplikasi mobile dengan React Native', 'general', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c', 800000, '12 minggu', 'Menengah', 'Sarah Wilson'),
  ('Data Science Bootcamp', 'Bootcamp intensif Data Science dengan Python dan Machine Learning', 'bootcamp', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', 3000000, '16 minggu', 'Intensif', 'Dr. Alex Chen'),
  ('UI/UX Design Mastery', 'Kuasai desain UI/UX dengan tools modern dan metodologi terbaru', 'general', 'https://images.unsplash.com/photo-1561070791-2526d30994b5', 600000, '8 minggu', 'Pemula', 'Lisa Anderson');

-- Function to handle user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();