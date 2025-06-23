
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, BookOpen, Trophy, Users, Star, ChevronRight } from "lucide-react";

const Index = () => {
  const [user] = useState({ name: "Alex", level: "Beginner", progress: 65 });

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

  const achievements = [
    { title: "First Model", icon: Trophy, unlocked: true },
    { title: "Week Streak", icon: Star, unlocked: true },
    { title: "Community Helper", icon: Users, unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-[#0A1A3D] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0A1A3D]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Aurora Nusa Academy
            </h1>
          </div>
          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
            Profile
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Welcome back, {user.name}! 👋</h2>
          <p className="text-gray-400">Continue your 3D animation journey</p>
        </div>

        {/* Progress Overview */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Your Progress</CardTitle>
            <CardDescription className="text-gray-400">
              Level: {user.level} • {user.progress}% Complete
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={user.progress} className="h-2" />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>Keep going!</span>
              <span>{user.progress}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Featured Courses */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-white">Featured Courses</h3>
            <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
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
                    <CardTitle className="text-white text-lg">{course.title}</CardTitle>
                    <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                      {course.level}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400">
                    by {course.instructor} • {course.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-400">
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
        </section>

        {/* Achievements */}
        <section className="space-y-4">
          <h3 className="text-2xl font-semibold text-white">Your Achievements</h3>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`flex-shrink-0 p-4 rounded-lg border ${
                  achievement.unlocked 
                    ? 'bg-yellow-600/20 border-yellow-600 text-yellow-400' 
                    : 'bg-gray-800/50 border-gray-700 text-gray-500'
                }`}
              >
                <achievement.icon className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm text-center font-medium">{achievement.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-2 gap-4">
          <Button className="h-20 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            <div className="text-center">
              <Play className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm">Continue Learning</span>
            </div>
          </Button>
          <Button variant="outline" className="h-20 border-gray-700 text-white hover:bg-gray-800">
            <div className="text-center">
              <Users className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm">Community</span>
            </div>
          </Button>
        </section>
      </div>
    </div>
  );
};

export default Index;
