"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Calendar } from "lucide-react";
import { usePathname, useRouter } from 'next/navigation';
import { DatePickerWithPresets } from "@/components/ui/DateRangePickerWithPresets";

export function MainNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-20 py-4 bg-white shadow-md z-50">
      <div className="flex items-center space-x-6">
        <Tabs value={pathname} onValueChange={(value) => router.push(value)}>
          <TabsList className="flex space-x-2 bg-transparent">
            {[
              { value: "/dashboard", label: "Dashboard" },
              { value: "/", label: "Applicants" },
              { value: "/messages", label: "Messages" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                  pathname === tab.value
                    ? 'text-black bg-[#EDF4F2]'
                    : 'text-black hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex items-center space-x-6">
        <DatePickerWithPresets />

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>OR</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Olivia Rhye</span>
            <span className="text-xs text-gray-500">olivia@untitledui.com</span>
          </div>
        </div>
      </div>
    </nav>
  );
}