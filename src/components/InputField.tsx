"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Zap } from 'lucide-react';
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generatePrompt } from "@/prompts/prompt";
import { useState } from "react";
import { Infinity } from 'lucide-react';


type InputFieldProps = {
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  FetchQue: (data: string) => void;
};

const InputField = ({ FetchQue, isFetching, setIsFetching }: InputFieldProps) => {
  const [difficulty, setDifficulty] = useState<string>("");
  const [cardCount, setCardCount] = useState<string>("10"); // default "10"

  const formSchema = z.object({
    prompt: z.string().min(1, "Please enter a topic").trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const [creditCount, setCreditCount] = useState('');
  const [isOpen, setIsOpen] = useState(false);



  const toggleDropdown = () => setIsOpen(!isOpen);

  // const handleValueChange = (value: string) => {
  //   if (value === 'buy') {
  //     // router.push('/api/buy');
  //   } else {
  //     setCreditCount(value); // Handle other values normally
  //   }
  // };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsFetching(true);
    try {
      const prompt = generatePrompt({ count: cardCount, type: difficulty, text: data.prompt });
      FetchQue(prompt);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="border border-blue-100 rounded-xl bg-white p-6 shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-medium text-blue-600">
                  What would you like to study?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., World War II, Photosynthesis, JavaScript fundamentals..."
                    {...field}
                    className="min-h-[120px] w-full bg-blue-50/30 border border-blue-200 rounded-lg px-4 py-3 text-gray-800 placeholder:text-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Select onValueChange={(e) => setDifficulty(e)}>
                <SelectTrigger className="w-[120px] bg-white border border-blue-200 text-blue-600 hover:border-blue-300">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-blue-200">
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(e) => setCardCount(e)}>
                <SelectTrigger className="w-[120px] bg-white border border-blue-200 text-blue-600 hover:border-blue-300">
                  <SelectValue placeholder="Cards: 10" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-blue-200">
                  <SelectItem value="5">5 Cards</SelectItem>
                  <SelectItem value="10">10 Cards</SelectItem>
                  <SelectItem value="15">15 Cards</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3 ">
              <div className="relative inline-block text-left">
                {/* Trigger */}
                <div
                  id="credit"
                  className="flex items-center gap-1 border border-blue-100 rounded-lg px-2 py-1 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <p className="text-blue-600 text-xs font-small">Credits: {creditCount}</p>
                  <Infinity className="w-4 h-4 text-blue-600" />
                </div>

                {/* Dropdown */}
                {/* {isOpen && (
                  <div className="absolute mt-1 w-40 bg-white border border-blue-100 rounded-lg shadow-md z-10">
                    <ul className="text-sm text-blue-600">
                      <li className="px-4 py-2 hover:bg-blue-50  rounded-t-lg cursor-pointer">Buy more credits</li>
                      <li className="px-4 py-2 hover:bg-blue-50 rounded-b-lg cursor-pointer">View usage</li>
                    </ul>
                  </div>
                )} */}
              </div>
              <Button
                type="submit"
                disabled={isFetching}
                className="h-10 px-6 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-medium rounded-full hover:from-blue-500 hover:to-teal-500 hover:shadow-md transition-all"
              >
                {isFetching ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Generate
                  </>
                )}
              </Button>
            </div>

          </div>
        </form>
      </Form>
    </div>
  );
};

export default InputField;
