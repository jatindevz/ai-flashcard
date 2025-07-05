"use client"
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TextShimmer } from '@/components/ui/text-shimmer';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, ChevronRight, ChevronLeft } from "lucide-react";

interface Flashcard {
    Q: string;
    A: string;
}

interface DisplayQueProps {
    inputData: string;
    isFetching: boolean;
}

const DisplayQue = ({ inputData, isFetching }: DisplayQueProps) => {
    
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    function extractFlashcards(raw: string): Flashcard[] {
        const flashcards: Flashcard[] = [];
        const matches = raw.match(/<FLASHCARDS>([\s\S]*?)<\/FLASHCARDS>/);
        if (!matches || matches.length < 2) return flashcards;

        const flashcardBlock = matches[1].trim();
        const cardEntries = flashcardBlock.split('---').map(entry => entry.trim());

        for (const entry of cardEntries) {
            const qMatch = entry.match(/Q:\s*(.*)/);
            const aMatch = entry.match(/A:\s*(.*)/);
            if (qMatch && aMatch) {
                flashcards.push({ Q: qMatch[1].trim(), A: aMatch[1].trim() });
            }
        }

        return flashcards;
    }

    useEffect(() => {
        setFlashcards([]);
        console.log("inputData from displayque: ", inputData);
        
        if (inputData) {
            const extractedCards = extractFlashcards(inputData);
            setFlashcards(extractedCards);
            setCurrentCardIndex(0);
        }
    }, [inputData]);

    return (
        <div >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:30px_30px] " />
            <div className="w-full relative">

                {flashcards.length > 0 ? (
                    <div className="w-full">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
                                Your Study Cards
                            </h2>
                            <p className="text-gray-600 text-sm">
                                {currentCardIndex + 1} of {flashcards.length} cards
                            </p>
                        </div>

                        <Carousel
                            className="w-full "
                        >
                            <CarouselContent className="-ml-2 md:-ml-4">
                                {flashcards.map((card, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                                    >
                                        <div className="p-2 h-full">
                                            <Card className="h-72 bg-white border border-blue-100 hover:border-blue-300 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                                                <CardContent className="flex flex-col h-full p-6">
                                                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                                                        <span className="text-lg font-medium text-gray-800 leading-relaxed">
                                                            {card.Q}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-center mt-4">
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    className="rounded-full bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all"
                                                                >
                                                                    <Eye className="w-4 h-4 mr-2" />
                                                                    Show Answer
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent className="bg-white border border-blue-200 rounded-xl max-w-md shadow-xl">
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle className="text-blue-600 text-xl font-semibold">
                                                                        Answer
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription className="text-gray-700 text-base leading-relaxed mt-4">
                                                                        {card.A}
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogAction className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white rounded-full px-6 py-2 transition-all">
                                                                        Continue Studying
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            <CarouselPrevious className="hidden sm:flex left-0 -translate-x-2 bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 shadow-md" />
                            <CarouselNext className="hidden sm:flex right-0 translate-x-2 bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 shadow-md" />
                        </Carousel>

                        {/* Mobile navigation */}
                        <div className="flex justify-center gap-4 mt-6 sm:hidden">
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full bg-white border border-blue-200 text-blue-600"
                                onClick={() => setCurrentCardIndex(prev => Math.max(0, prev - 1))}
                                disabled={currentCardIndex === 0}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full bg-white border border-blue-200 text-blue-600"
                                onClick={() => setCurrentCardIndex(prev => Math.min(flashcards.length - 1, prev + 1))}
                                disabled={currentCardIndex === flashcards.length - 1}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ) : isFetching ? (
                    <div className="text-center py-16">
                        {/* <div className="inline-flex items-center gap-3 text-blue-600">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="text-lg">Generating your flashcards...</span>
                        </div> */}
                            <TextShimmer
                                className='text-xl font-medium [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]'
                                duration={1.2}>
                                Generating your ...
                            </TextShimmer>
                        <p className="text-gray-500 mt-2 text-sm">This usually takes 10-20 seconds</p>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="inline-flex flex-col items-center gap-2 text-gray-500">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <span className="text-lg">No flashcards yet</span>
                            <p className="text-gray-400 text-sm">Enter a topic to generate your first set</p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default DisplayQue;