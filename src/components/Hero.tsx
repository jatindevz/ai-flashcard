"use client"
import {  useRef, useState } from "react";
import { motion } from "framer-motion";
import InputField from "@/components/InputField";
import DisplayQue from "@/components/DisplayQue";
import axios from "axios";
import { toast } from 'sonner';



export default function Hero() {
  const [inputData, setInputData] = useState<string>("");
  const [isFetching, setIsFetching] = useState(false);


  const FetchQue = async (data: string) => {
    try {
      setIsFetching(true);
      const response = await axios.post("/api/fetchdata", { prompt: data });
      setInputData(response.data.message);
      toast.success("Flashcards generated successfully!", {
        style: {
          background: '#fff',
          color: '#1e40af',
          border: '1px solid #bfdbfe'
        }
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate flashcards. Please try again.", {
        style: {
          background: '#fff',
          color: '#b91c1c',
          border: '1px solid #fecaca'
        }
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="relative w-full min-h-full bg-white">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:30px_30px]" />



      <div className="relative z-10 flex flex-col items-center min-h-screen">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center flex-1 w-full px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
              AI-Powered Flashcards
            </h1>
            <motion.p
              className="mb-8 text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transform any topic into interactive study cards instantly. Perfect for students and lifelong learners.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <InputField
                FetchQue={FetchQue}
                isFetching={isFetching}
                setIsFetching={setIsFetching}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Flashcards Section */}
        <div className="w-full px-4 py-12 bg-white/50 backdrop-blur-sm">
          <DisplayQue
            inputData={inputData}
            isFetching={isFetching}
          />
        </div>
      
      </div>
    </div>
  );
}