import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star } from 'lucide-react';

export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'general' | 'bootcamp';
  image_url?: string;
  price: number;
  duration?: string;
  level?: string;
  instructor?: string;
}

interface CourseCardProps {
  course: Course;
  onEnroll: (courseId: string) => void;
  isEnrolled?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onEnroll, 
  isEnrolled = false 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryBadge = (category: string) => {
    return category === 'bootcamp' 
      ? <Badge className="bg-orange-500 hover:bg-orange-600">Bootcamp Intensif</Badge>
      : <Badge variant="secondary">Pelatihan Umum</Badge>;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={course.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          {getCategoryBadge(course.category)}
        </div>
      </div>
      
      <CardHeader className="flex-1">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {course.price === 0 ? 'GRATIS' : formatPrice(course.price)}
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm line-clamp-3">{course.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration || '8 minggu'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.level || 'Pemula'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>4.8</span>
          </div>
        </div>

        {course.instructor && (
          <div className="text-sm text-gray-600">
            Instruktur: <span className="font-medium">{course.instructor}</span>
          </div>
        )}

        <Button 
          onClick={() => onEnroll(course.id)}
          className={`w-full ${
            isEnrolled 
              ? 'bg-green-600 hover:bg-green-700' 
              : course.category === 'bootcamp' 
                ? 'bg-orange-500 hover:bg-orange-600' 
                : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isEnrolled}
        >
          {isEnrolled ? 'Sudah Terdaftar' : 'Daftar Sekarang'}
        </Button>
      </CardContent>
    </Card>
  );
};