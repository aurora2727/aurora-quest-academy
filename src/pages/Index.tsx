
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, BookOpen, Trophy, Users, Star, ChevronRight, Menu, X, Phone, ShoppingCart } from "lucide-react";

const Index = () => {
  const [user] = useState({ name: "Alex", level: "Beginner", progress: 65 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Programs", href: "#" },
    { name: "Locations", href: "#" },
    { name: "For Corporate", href: "#" },
    { name: "Community", href: "#" },
    { name: "Why Aurora Nusa", href: "#" }
  ];

  const featuredCourses = [
    {
      id: 1,
      title: "Blender Character Modeling",
      instructor: "Maya Chen",
      duration: "8 weeks",
      level: "Beginner",
      rating: 4.8,
      students: 1234,
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      progress: 30
    },
    {
      id: 2,
      title: "Unity Game Development",
      instructor: "Ryan Torres",
      duration: "12 weeks", 
      level: "Intermediate",
      rating: 4.9,
      students: 856,
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      progress: 0
    }
  ];

  const stats = [
    { number: "5+ tahun", label: "Pengalaman di dunia 3D animation" },
    { number: "500+", label: "Global hiring partners" },
    { number: "10,000+", label: "Alumni" },
    { number: "s.d. 25 juta/bulan", label: "Gaji awal tertinggi alumni Aurora Nusa" },
    { number: "On campus + online", label: "Pilihan metode belajar terlengkap" }
  ];

  const specialties = [
    "3D Modeling",
    "Character Design", 
    "Game Development",
    "Animation",
    "VFX & Motion Graphics",
    "Unity Development"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">Aurora Nusa Academy</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-700 hover:text-teal-600 font-medium">
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hidden md:flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="hidden md:block">
                Masuk
              </Button>
              <Button className="bg-teal-600 hover:bg-teal-700 hidden md:block">
                Daftar
              </Button>
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <a key={item.name} href={item.href} className="text-gray-700 hover:text-teal-600 font-medium">
                    {item.name}
                  </a>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="outline" className="w-full">Masuk</Button>
                  <Button className="bg-teal-600 hover:bg-teal-700 w-full">Daftar</Button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Raih <span className="text-teal-400">karir</span> dan <span className="text-teal-400">keahlian digital</span> dengan peluang kerja tanpa batas
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Aurora Nusa Academy dipercaya sejak 2019 dan telah menyalurkan lebih dari 
                10.000 talenta digital berkualitas ke 500+ hiring partner 
                Aurora Nusa di seluruh dunia
              </p>
              
              <div className="flex flex-wrap gap-3">
                {specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline" className="bg-teal-600/20 text-teal-300 border-teal-500">
                    {specialty}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                  Lihat Program
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                  <Phone className="w-4 h-4 mr-2" />
                  Hubungi Kami
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-teal-500/20 to-blue-600/20 rounded-2xl p-8">
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                  alt="Aurora Nusa Academy Students"
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                  <Button size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white">
                    <Play className="w-6 h-6 mr-2" />
                    Aurora Nusa Academy Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mengapa memilih <span className="text-teal-600">Aurora Nusa Academy</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aurora Nusa telah menjadi lembaga pendidikan teknologi digital berpengalaman dan terpercaya selama lebih dari 5 
              tahun sejak 2019.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Lulusan Aurora Nusa telah terbukti di industri
                </h3>
              </div>
              <p className="text-gray-600">
                Aurora Nusa telah menjadi talent pool bagi 500+ perusahaan hiring partner dari berbagai 
                sektor industri di seluruh dunia.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Aurora Nusa is a life changer
                </h3>
              </div>
              <p className="text-gray-600">
                Bergabung bersama dengan 10,000+ alumni kami yang telah meraih karir impian di industri 
                digital dari berbagai macam background.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Dukungan karir seumur hidup
                </h3>
              </div>
              <p className="text-gray-600">
                Mulai dari membangun CV, persiapan interview hingga konsultasi karir, Aurora Nusa siap 
                membantu judi talenta digital unggulan.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900">Featured Courses</h3>
            <Button variant="ghost" className="text-teal-600 hover:text-teal-700">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Continue
                    </Button>
                  </div>
                  {course.progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                      <Progress value={course.progress} className="h-1" />
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-gray-900 text-lg">{course.title}</CardTitle>
                    <Badge variant="secondary" className="bg-teal-100 text-teal-800 text-xs">
                      {course.level}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600">
                    by {course.instructor} • {course.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                      <span>({course.students} students)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Your Progress Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Your Learning Progress</h3>
          <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Welcome back, {user.name}! 👋</CardTitle>
              <CardDescription className="text-gray-600">
                Level: {user.level} • {user.progress}% Complete
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={user.progress} className="h-3 mb-4" />
              <div className="flex justify-between text-sm text-gray-600 mb-6">
                <span>Keep going!</span>
                <span>{user.progress}%</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Play className="w-4 h-4 mr-2" />
                  Continue Learning
                </Button>
                <Button variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-50">
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
