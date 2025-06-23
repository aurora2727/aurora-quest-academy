import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { CourseCard, Course } from '@/components/courses/CourseCard';
import { AuthModal } from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Filter, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'bootcamp'>('all');

  useEffect(() => {
    fetchCourses();
    if (user) {
      fetchEnrollments();
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: "Error",
        description: "Gagal memuat kursus",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setEnrolledCourses(data?.map(e => e.course_id) || []);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: courseId,
        });

      if (error) throw error;

      setEnrolledCourses([...enrolledCourses, courseId]);
      toast({
        title: "Berhasil Mendaftar!",
        description: "Anda telah berhasil mendaftar kursus ini.",
      });
    } catch (error: any) {
      toast({
        title: "Gagal Mendaftar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const generalCourses = filteredCourses.filter(course => course.category === 'general');
  const bootcampCourses = filteredCourses.filter(course => course.category === 'bootcamp');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat kursus...</p>
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
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Aurora Nusa Academy</h1>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Kursus & Program Pelatihan</h2>
            <p className="text-xl text-blue-100">Tingkatkan skill digital Anda dengan program terbaik kami</p>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <section className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari kursus..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as any)}>
                <TabsList>
                  <TabsTrigger value="all">Semua</TabsTrigger>
                  <TabsTrigger value="general">Pelatihan Umum</TabsTrigger>
                  <TabsTrigger value="bootcamp">Bootcamp</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeCategory === 'all' ? 'general' : activeCategory} className="space-y-8">
            <TabsContent value="general" className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Pelatihan Umum</h3>
                <p className="text-gray-600 mb-8">Program pelatihan untuk upgrade skill dengan kurikulum berstandar industri</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generalCourses.map(course => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onEnroll={handleEnroll}
                      isEnrolled={enrolledCourses.includes(course.id)}
                    />
                  ))}
                </div>
                
                {generalCourses.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Tidak ada kursus pelatihan umum yang ditemukan</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="bootcamp" className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Bootcamp Intensif</h3>
                <p className="text-gray-600 mb-8">Program intensif untuk optimasi skill digital agar siap kerja dalam waktu singkat</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bootcampCourses.map(course => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onEnroll={handleEnroll}
                      isEnrolled={enrolledCourses.includes(course.id)}
                    />
                  ))}
                </div>
                
                {bootcampCourses.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Tidak ada bootcamp yang ditemukan</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Show both categories when "all" is selected */}
          {activeCategory === 'all' && (
            <div className="space-y-16">
              {/* General Training Section */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Pelatihan Umum</h3>
                <p className="text-gray-600 mb-8">Program pelatihan untuk upgrade skill dengan kurikulum berstandar industri</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generalCourses.slice(0, 6).map(course => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onEnroll={handleEnroll}
                      isEnrolled={enrolledCourses.includes(course.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Bootcamp Section */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Bootcamp Intensif</h3>
                <p className="text-gray-600 mb-8">Program intensif untuk optimasi skill digital agar siap kerja dalam waktu singkat</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bootcampCourses.slice(0, 6).map(course => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onEnroll={handleEnroll}
                      isEnrolled={enrolledCourses.includes(course.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab="register"
      />
    </div>
  );
};

export default Courses;