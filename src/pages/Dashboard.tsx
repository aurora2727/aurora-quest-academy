import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Trophy, Clock, Users, Play, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course } from '@/components/courses/CourseCard';

interface Enrollment {
  id: string;
  course_id: string;
  enrolled_at: string;
  progress: number;
  completed_at?: string;
  courses: Course;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEnrollments();
    }
  }, [user]);

  const fetchEnrollments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses (*)
        `)
        .eq('user_id', user.id)
        .order('enrolled_at', { ascending: false });

      if (error) throw error;
      setEnrollments(data || []);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const completedCourses = enrollments.filter(e => e.completed_at);
  const inProgressCourses = enrollments.filter(e => !e.completed_at);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-400 to-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-100">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </Link>
            <Button 
              onClick={signOut}
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Logout
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Selamat datang, {user?.full_name || 'Peserta'}!</h1>
              <p className="text-blue-100">Lanjutkan perjalanan belajar Anda</p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Kursus</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{enrollments.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sedang Berjalan</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inProgressCourses.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Selesai</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedCourses.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rata-rata Progress</CardTitle>
                <Play className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {enrollments.length > 0 
                    ? Math.round(enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length)
                    : 0}%
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Progress */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Kursus Saya</h2>
            <Link to="/courses">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Jelajahi Kursus Lain
              </Button>
            </Link>
          </div>

          {enrollments.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Belum Ada Kursus
                </h3>
                <p className="text-gray-600 mb-6">
                  Mulai perjalanan belajar Anda dengan mendaftar kursus pertama
                </p>
                <Link to="/courses">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Jelajahi Kursus
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <Card key={enrollment.id} className="overflow-hidden">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={enrollment.courses.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'} 
                      alt={enrollment.courses.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={
                        enrollment.courses.category === 'bootcamp' 
                          ? 'bg-orange-500 hover:bg-orange-600' 
                          : 'bg-blue-500 hover:bg-blue-600'
                      }>
                        {enrollment.courses.category === 'bootcamp' ? 'Bootcamp' : 'Pelatihan Umum'}
                      </Badge>
                    </div>
                    {enrollment.completed_at && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-500 hover:bg-green-600">
                          <Trophy className="w-3 h-3 mr-1" />
                          Selesai
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">
                      {enrollment.courses.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {enrollment.courses.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Instruktur: {enrollment.courses.instructor}</span>
                      <span>{enrollment.courses.duration}</span>
                    </div>

                    <Button className="w-full" variant={enrollment.completed_at ? "outline" : "default"}>
                      {enrollment.completed_at ? 'Lihat Sertifikat' : 'Lanjutkan Belajar'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;