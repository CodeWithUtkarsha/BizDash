import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CursorGlow } from '@/components/ui/background-effects';
import { useAuth } from '@/contexts/AuthContext';
import { Camera, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';

export const ProfileForm = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      updateProfile({
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`,
        avatar: imagePreview || user?.avatar
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      setIsLoading(false);
    }, 1000);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/dashboard">
          <Button
            data-testid="button-back-to-dashboard"
            variant="ghost"
            className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-4 p-0"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <h2 className="text-3xl font-bold text-white">Profile Settings</h2>
      </div>

      <CursorGlow>
        <Card className="glass-card hover-glow border-white/10 bg-white/5 backdrop-blur-xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Profile Image Section */}
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-32 h-32 border-4 border-cyan-500/20">
                    <AvatarImage 
                      src={imagePreview || user?.avatar} 
                      alt={user?.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white text-3xl font-bold">
                      {user?.name ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <Button
                    data-testid="button-upload-image"
                    type="button"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-cyan-500 hover:bg-cyan-600 rounded-full border-4 border-navy-800"
                  >
                    <Camera className="w-5 h-5" />
                  </Button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 
                    data-testid="text-profile-name"
                    className="text-xl font-semibold text-white mb-2"
                  >
                    {user?.name}
                  </h3>
                  <p 
                    data-testid="text-profile-role"
                    className="text-gray-400"
                  >
                    {user?.role}
                  </p>
                </motion.div>
              </div>

              {/* Profile Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name
                      </Label>
                      <Input
                        data-testid="input-first-name"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name
                      </Label>
                      <Input
                        data-testid="input-last-name"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </Label>
                    <Input
                      data-testid="input-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone
                    </Label>
                    <Input
                      data-testid="input-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Bio Field */}
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">
                      Bio
                    </Label>
                    <Textarea
                      data-testid="textarea-bio"
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4">
                    <Link href="/dashboard">
                      <Button
                        data-testid="button-cancel"
                        type="button"
                        variant="ghost"
                        className="px-6 py-3 bg-white/5 text-gray-300 hover:bg-white/10 transition-all"
                      >
                        Cancel
                      </Button>
                    </Link>
                    <Button
                      data-testid="button-save-changes"
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-3 btn-primary text-lg focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </CursorGlow>
    </div>
  );
};
