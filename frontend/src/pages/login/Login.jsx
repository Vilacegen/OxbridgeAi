import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = () => {
    // login logic here
    localStorage.setItem("isAuthenticated", "true")
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F3F4F6]">
      <Card className="w-full max-w-md bg-[#242424]">
        <CardContent className="p-10">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className='w-full flex justify-start items-center'>
                <Label htmlFor="email" className="text-white">Email</Label>
              </div>       
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#CCCCCC]"
              />
            </div>
            <div className="space-y-2">
              <div className='w-full flex justify-start items-center'>
                <Label htmlFor="password" className="text-white">Password</Label>
              </div>    
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#CCCCCC]"
              />
            </div>
            <div className='w-full flex justify-center items-center'>
              <Button className="w-9/12 bg-[#676767] hover:bg-[#676767] hover:bg-opacity-85" onClick={(e)=> {
                e.preventDefault();
                login()
                }}>
                Log in
              </Button>
            </div>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;