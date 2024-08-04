"use client";

import { useState, useRef, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, MoreHorizontal, Smile } from "lucide-react";

interface Comment {
  text: string;
  author: string;
  timeAgo: string;
}

interface CommentBoxProps {
  initialComments?: Comment[];
}

export function CommentBox({ initialComments = [] }: CommentBoxProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { text: newComment, author: "User", timeAgo: "Just now" },
      ]);
      setNewComment("");
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-10 h-10 rounded-full p-0 bg-[#F9FAFB]"
        >
          <MessageCircle className="h-4 w-4 text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-[#ECF7F6]" align="start" alignOffset={-40} sideOffset={16}>
        <div className="p-4">
          <div className="max-h-60 overflow-y-auto space-y-4 mb-4">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="bg-[#ECF7F6] p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm text-black">
                        {comment.author}
                      </span>
                      <span className="text-xs text-[#A6A8BB]">
                        {comment.timeAgo}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                  <p className="text-sm text-[#344054]">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500"></p>
            )}
          </div>
          <div className="bg-[#D4EBE5] p-2 rounded-md">
            <div className="flex items-center space-x-2">
              <Input
                ref={inputRef}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Enter your comment..."
                className="flex-grow bg-transparent border-none focus:ring-0"
              />
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <Smile className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleAddComment} 
                className="flex-shrink-0 bg-[#002924] text-white hover:bg-[#002924]/90"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}