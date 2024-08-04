"use client";

import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CommentBox } from "@/components/CommentBox";
import { QuestionAnswer } from "@/components/QuestionAnswer";
import { useState, useEffect } from "react";

export default function Home() {
  const [isSticky, setIsSticky] = useState(false);
  const comments = [
    { text: "Initial comment", author: "Admin", timeAgo: "5 minutes ago" },
    // Add more comments as needed
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 200); 
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-20 py-2">
      <Tabs defaultValue="under-review" className="space-y-4 w-full ">
        <div className={`fixed w-full bg-white top-20 left-20 z-50`}>
          <TabsList className="border-b border-gray-200">
            <TabsTrigger value="new" disabled>New Applicants</TabsTrigger>
            <TabsTrigger value="under-review" className="data-[state=active]:bg-[#EDF4F2]">
              Under Review Applicants
            </TabsTrigger>
            <TabsTrigger value="rejected" disabled>
              Rejected Applicants
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="h-16"></div> {/* Spacer for fixed TabsList */}

        <TabsContent value="under-review" className="space-y-4 w-full">
          <div className="flex flex-col items-center justify-between mt-30 gap-0 w-full">
            <div className="w-full py-4">
              <Button variant="outline" className="">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            </div>
            <div className="flex flex-row gap-20 justify-center align-center"> 
              <div className="flex flex-col w-4/6 py-8 pt-6 gap-2">
                <div className="flex flex-row items-left">
                  <h2 className="text-3xl font-bold tracking-tight">Startup Name</h2>
                  <div className="text-[14px] font-semibold flex rounded-[26px] bg-[#D5EEEB] p-2 ml-4 text-[#344054]">Location</div>
                </div>
                <p className="text-3x1 font-light text-[#475467]">@industry</p>
                <p className="text-3x1 font-light text-[#475467]">Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices.</p>
              </div>
              <div className="flex items-center w-2/6">
                <div className="w-3 h-3 rounded-full bg-[#A4DACC] mr-2"></div>
                <h3 className="text-2x1 font-med">Application approved on 24th July 2024</h3>
              </div>
            </div>

            <div className={`w-full bg-white ${isSticky ? 'fixed top-30 left-0 z-10 px-20 py-4' : ''}`}>
              <div className="flex justify-between items-center">
                <Tabs defaultValue="ezvc" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="ezvc" className="data-[state=active]:bg-[#EDF4F2]">EZVC Application</TabsTrigger>
                    <TabsTrigger value="your" disabled>Your Application</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="space-x-2">
                  <Button variant="outline" className="bg-black text-white hover:bg-white hover:border-black hover:text-black">Invite for Chat</Button>
                  <Button variant="outline" className="bg-white text-[#344054] border-[#D0D5DD]">Keep in Review</Button>
                  <Button variant="outline" className="bg-[#F4EDED] text-[#8F0D0D] hover:bg-[#8F0D0D] hover:border-[#8F0D0D] hover:text-white">Reject</Button>
                </div>
              </div>
            </div>

            {isSticky && <div className="h-16"></div>} {/* Spacer when sticky */}
            
            <div className="flex flex-col items-center w-full mt-8">
              <QuestionAnswer
                questionNumber={1}
                question="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna?"
                answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue."
                initialComments={comments}
              />

              <QuestionAnswer
                questionNumber={2}
                question="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna?"
                answer="Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices."
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
