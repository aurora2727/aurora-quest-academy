import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, BookOpen, Trophy, Users, Star, ChevronRight, Menu, X, Phone, ShoppingCart, Search, GamepadIcon, Code, Smartphone, Settings, Palette, Box, ChevronLeft, MessageCircle } from "lucide-react";
const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigationItems = [{
    name: "Programs",
    href: "#programs"
  }, {
    name: "School Solutions",
    href: "#"
  }, {
    name: "Corporate Solutions",
    href: "#"
  }, {
    name: "Hub",
    href: "#"
  }];
  const academyPrograms = [{
    id: 1,
    title: "Game Development",
    icon: GamepadIcon,
    description: "Unity, Unreal Engine, C#"
  }, {
    id: 2,
    title: "3D Design",
    icon: Box,
    description: "Blender, Maya, Character Modeling"
  }, {
    id: 3,
    title: "Web Development",
    icon: Code,
    description: "React, Node.js, Full Stack"
  }, {
    id: 4,
    title: "App Development",
    icon: Smartphone,
    description: "Flutter, React Native"
  }, {
    id: 5,
    title: "DevOps",
    icon: Settings,
    description: "Docker, AWS, CI/CD"
  }, {
    id: 6,
    title: "2D Design",
    icon: Palette,
    description: "Photoshop, Illustrator, UI/UX"
  }];
  const featuredPrograms = [{
    id: 1,
    title: "Pelatihan Umum",
    subtitle: "Program untuk upgrade skill",
    description: "dengan kurikulum berstandar industri. Ada berbagai bidang keahlian yang bisa dipelajari dengan instruktur expert.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    buttonText: "Jelajahi Program"
  }, {
    id: 2,
    title: "Bootcamp Intensif",
    subtitle: "Program untuk optimasi skill",
    description: "digital secara lebih intensif agar siap kerja dalam waktu singkat dengan mentor berpengalaman.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
    buttonText: "Jelajahi Program"
  }, {
    id: 3,
    title: "Magang Akademis",
    subtitle: "Program pelatihan kerja lapangan",
    description: "(PKL) bersertifikat untuk siswa, mahasiswa, dan fresh graduate yang ingin pengalaman industri.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    buttonText: "Jelajahi Program"
  }, {
    id: 4,
    title: "Magang Pro",
    subtitle: "Program pelatihan kerja (internship)",
    description: "bersertifikat di perusahaan dan bidang teknologi pilihan dengan mentor berpengalaman.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
    buttonText: "Jelajahi Program"
  }, {
    id: 5,
    title: "Lowongan Kerja",
    subtitle: "Program untuk bantu para pencari",
    description: "kerja menjadi talenta digital yang siap diserap industri dengan pelatihan dan sertifikasi.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    buttonText: "Jelajahi Program"
  }];
  const testimonials = [{
    id: 1,
    name: "Drs. Amran Ali, MM.",
    position: "Kepala Sekolah SMKN 1 Simpang Empat",
    rating: 5,
    text: "Saya, selaku Kepala SMKN 1 Simpang Empat mengapresiasi Program Kelas Industri Aurora Nusa yang sesuai dengan konsep link and supermatch 8+i yang dicanangkan oleh Kemendikbudristek. Dengan terbangunnya Program Kelas Industri, harapan sekolah bisa mencetak lulusan sesuai dengan standar industri.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
  }, {
    id: 2,
    name: "Dewi Purnamasari, S.Kom",
    position: "Kaprodi Sistem dan Teknologi Informasi",
    rating: 5,
    text: "Aurora Nusa memberikan pengalaman belajar yang disesuaikan dengan kebutuhan industri. Program Magang Studi Independen dari mengajar dengan kreatif dan interaktif memberikan dampak positif.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786"
  }];
  const whyChooseFeatures = [{
    title: "Kurikulum Industri",
    description: "Kurikulum dirancang oleh pakar di bidangnya masing-masing, kemudian dipadukan dengan metode PBL (Project-Based Learning).",
    icon: BookOpen
  }, {
    title: "Pengajar Industri",
    description: "Dalam proses pelaksanaan pelatihan, peserta akan dibimbing oleh pengajar yang berasal dari industri dan berpengalaman di bidangnya.",
    icon: Users
  }, {
    title: "Sertifikat Industri",
    description: "Sertifikat kompetensi yang dikeluarkan oleh Aurora Nusa menggunakan sistem penilaian yang ketat dan standar industri sehingga terpercaya.",
    icon: Trophy
  }];
  return <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-400 to-blue-600 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <h1 className="text-xl font-bold text-white">AURORA NUSA</h1>
              <span className="text-sm text-blue-100">INDONESIA</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map(item => <a key={item.name} href={item.href} className="text-white hover:text-blue-100 font-medium">
                  {item.name} <ChevronRight className="w-4 h-4 inline ml-1" />
                </a>)}
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hidden md:flex items-center space-x-2 text-white hover:bg-white/20">
                <Search className="w-4 h-4" />
              </Button>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold hidden md:block">
                Masuk
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 hidden md:block">
                Daftar
              </Button>
              
              {/* Mobile menu button */}
              <Button variant="ghost" size="icon" className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && <nav className="lg:hidden mt-4 pb-4 border-t border-blue-400 pt-4">
              <div className="flex flex-col space-y-4">
                {navigationItems.map(item => <a key={item.name} href={item.href} className="text-white hover:text-blue-100 font-medium">
                    {item.name}
                  </a>)}
                <div className="flex flex-col space-y-2 pt-4">
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold w-full">Masuk</Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 w-full">Daftar</Button>
                </div>
              </div>
            </nav>}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-400 to-blue-600 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Optimasi Skill dan Kompetensi, <br />
                Lebih Siap Kerja dan Wirausaha
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">Raih karir dan keahlian digital dengan peluang kerja tanpa batas</p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold">
                  Daftar GRATIS Sekarang
                </Button>
                
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 relative">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="Aurora Nusa Academy Students" className="w-full h-80 object-cover rounded-xl" />
                <div className="absolute top-4 right-4 bg-white rounded-lg p-2">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-900">4.8/5</span>
                  </div>
                  <p className="text-xs text-gray-600">Tingkat Kepuasan</p>
                </div>
                <div className="absolute bottom-4 left-4 bg-white rounded-lg p-2">
                  <div className="text-lg font-bold text-gray-900">10+</div>
                  <p className="text-xs text-gray-600">Kursus Pilihan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mengapa memilih kami</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dukungan Karir Seumur Hidup</h3>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow bg-blue-50 border-blue-200">
              <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Lulusan Telah Terbukti di Industri</h3>
              <p className="text-sm text-blue-500">
            </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">We are a Life Changer</h3>
            </Card>
          </div>
        </div>
      </section>

      {/* Academy Programs Section */}
      <section className="py-16" id="programs">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Aurora Nusa Academy</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {academyPrograms.map(program => <Card key={program.id} className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <program.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-sm text-gray-600">{program.description}</p>
              </Card>)}
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex space-x-2 items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Program Unggulan Aurora Nusa</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredPrograms.slice(0, 3).map(program => <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{program.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {program.subtitle} {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-sky-500 hover:bg-sky-600">
                    {program.buttonText}
                  </Button>
                </CardContent>
              </Card>)}
          </div>

          <div className="text-center mb-12">
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            

            <div className="relative">
              
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Cerita Mereka Tentang Aurora Nusa Academy</h2>
            
            <div className="inline-flex space-x-4 bg-white rounded-lg p-1 shadow-sm mb-8">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Testimoni Pimpinan</Button>
              <Button variant="ghost" className="text-gray-600">Kisah Sukses Alumni</Button>
              <Button variant="ghost" className="text-gray-600">Karya Keren Peserta</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map(testimonial => <Card key={testimonial.id} className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                    <div className="flex space-x-1 mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
              </Card>)}
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex space-x-2 items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Join Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Saatnya Bergabung di Ekosistem <br />
              Aurora Nusa by Educa
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-2 border-blue-200 bg-blue-50">
              <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Siswa, Mahasiswa, dan <br />Pencari Kerja
              </h3>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                SMA/K dan Perguruan Tinggi
              </h3>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Korporasi dan Instansi
              </h3>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {featuredPrograms.map(program => <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative overflow-hidden">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">{program.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <Button size="sm" className="w-full bg-sky-500 hover:bg-sky-600 text-sm">
                    {program.buttonText}
                  </Button>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="icon" className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg">
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>;
};
export default Index;