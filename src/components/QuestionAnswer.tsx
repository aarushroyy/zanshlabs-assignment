"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaCopy } from "react-icons/fa";
import { CommentBox } from "@/components/CommentBox";

interface QuestionAnswerProps {
  questionNumber: number;
  question: string;
  answer: string;
  initialComments?: { text: string; author: string; timeAgo: string }[];
}

export function QuestionAnswer({
  questionNumber,
  question,
  answer,
  initialComments = [],
}: QuestionAnswerProps) {
  const [copySuccess, setCopySuccess] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(answer).then(
      () => setCopySuccess("Copied!"),
      () => setCopySuccess("Failed to copy.")
    );
  };

  return (
    <div className="flex flex-col items-end w-full mx-auto py-8">
      <div className="w-full space-y-4">
        {/* Question Number and Question Box */}
        <div className="text-left w-full">
          <span className="font-bold text-lg text-[#475467]">Question {questionNumber}</span>
          <div className="bg-[#F9FAFB] p-6 rounded-lg mt-2 text-[#344054]">
            <p>{question}</p>
          </div>
        </div>

        {/* Answer Box */}
        <div className="bg-[#ECF7F6] p-6 rounded-lg relative w-full">
          <p className="pr-24 pb-8 text-[#475467]">{answer}</p>
          <div className="absolute bottom-4 right-4 flex items-center space-x-2">
            {copySuccess && (
              <span className="text-blue-500 text-sm">{copySuccess}</span>
            )}
            <Button
              onClick={handleCopy}
              className="bg-white border-[#667085] text-[#667085] px-4 py-2 rounded hover:text-white"
            >
              <FaCopy size={16} className="mr-2" /> Copy
            </Button>
          </div>
        </div>
      </div>

      {/* Comment Box */}
      <div className="mt-4">
        <CommentBox initialComments={initialComments} />
      </div>
    </div>
  );
}