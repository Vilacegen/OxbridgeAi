import { useEffect, useState } from "react";
import JudgesHeader from "@/components/components/JudgesHeader";
import ScoringTimer from "@/components/components/ScoringTimer";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import PropTypes from 'prop-types';

// Define the initial state structure for a section
const createInitialSectionState = (questions) => {
  const questionScores = {};
  questions.forEach((_, index) => {
    questionScores[index] = null;
  });
  return {
    scores: questionScores,
    feedback: ''
  };
};

// Create initial state for all sections
const createInitialFormState = (sections) => {
    const initialState = {
      overallFeedback: '', // Add overall feedback to initial state
    };
    sections.forEach(section => {
      initialState[section.id] = createInitialSectionState(section.questions);
    });
    return initialState;
  };

const ScoreSection = ({ questions, sectionId, formState, onScoreChange, onFeedbackChange }) => (
  <div className="space-y-4">
    {questions.map((question, questionIndex) => (
      <div key={questionIndex} className="space-y-2">
        <p className="text-[#f3f1f1]">{question}</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((score) => (
            <div
              key={score}
              onClick={() => onScoreChange(sectionId, questionIndex, score)}
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all
                ${formState[sectionId].scores[questionIndex] === score 
                  ? 'border-2 border-[#0A2540] bg-gray-100' 
                  : 'hover:bg-gray-50'
                }`}
            >
              <span role="img" aria-label={`rating ${score}`} className="text-xl">
                {score <= 1 ? "😟" : score <= 2 ? "🙁" : score <= 3 ? "😊" : score <= 4 ? "😄" : "🤩"}
              </span>
            </div>
          ))}
        </div>
      </div>
    ))}
    <div className="space-y-2">
      <p className="font-semibold text-white">Feedback</p>
      <Textarea 
        placeholder="Provide detailed feedback here..." 
        className="min-h-[100px] placeholder:text-[#d0cccc] text-[#f2f0f0]"
        value={formState[sectionId].feedback}
        onChange={(e) => onFeedbackChange(sectionId, e.target.value)}
      />
    </div>
  </div>
);

ScoreSection.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
  sectionId: PropTypes.string.isRequired,
  formState: PropTypes.object.isRequired,
  onScoreChange: PropTypes.func.isRequired,
  onFeedbackChange: PropTypes.func.isRequired,
};

const scoringSections = [
  {
    id: "problem",
    title: "Problem (10/100%)",
    questions: [
      "Is there a clear problem?",
      "Is there evidence to support the importance of the problem?",
      "Is the problem solvable?",
      "How obsessed is the team on the problem?"
    ]
  },
  {
    id: "solution",
    title: "Solution (10/100%)",
    questions: [
      "Does the solution make sense?",
      "Is there a clear vision of what the solution should be?",
      "Is the solution innovative?",
      "Is the solution feasible?"
    ]
  },
  {
    id: "innovation",
    title: "Innovation (10/100%)",
    questions: [
      "Is the innovation significant?",
      "Does it create new opportunities?",
      "Is it differentiated from existing solutions?"
    ]
  },
  {
    id: "team",
    title: "Team (20/100%)",
    questions: [
      "Does the team have relevant experience?",
      "Is the team composition balanced?",
      "Do they show strong leadership potential?"
    ]
  },
  {
    id: "business-model",
    title: "Business Model (10/100%)",
    questions: [
      "Is the business model clear?",
      "Is it scalable?",
      "Are the revenue streams well-defined?"
    ]
  },
  {
    id: "market-opportunity",
    title: "Market Opportunity (30/100%)",
    questions: [
      "Is the market size significant?",
      "Is the growth potential strong?",
      "Is the competitive advantage sustainable?"
    ]
  },
  {
    id: "technical-feasibility",
    title: "Technical Feasibility (10/100%)",
    questions: [
      "Is the technical approach sound?",
      "Are the technical challenges well understood?",
      "Does the team have the technical capability?"
    ]
  }
];

export default function Score() {
    const [status, setStatus] = useState('idle');
    const [time, setTime] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const [formState, setFormState] = useState(createInitialFormState(scoringSections));

    useEffect(() => {
        let interval;
        
        if (status === 'running') {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [status]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleStart = () => {
        setStatus('running');
        setHasStarted(true);
    };
    const handlePause = () => setStatus('paused');
    const handleResume = () => setStatus('running');
    const handleStop = () => setStatus('stopped');
    const handleReset = () => {
        setTime(0);
        setStatus('paused')
    };

    const handleScoreChange = (sectionId, questionIndex, score) => {
        setFormState(prev => ({
            ...prev,
            [sectionId]: {
                ...prev[sectionId],
                scores: {
                    ...prev[sectionId].scores,
                    [questionIndex]: score
                }
            }
        }));
    };

    const handleFeedbackChange = (sectionId, feedback) => {
        setFormState(prev => ({
            ...prev,
            [sectionId]: {
                ...prev[sectionId],
                feedback
            }
        }));
    };

    const handleOverallFeedbackChange = (feedback) => {
        setFormState(prev => ({
          ...prev,
          overallFeedback: feedback
        }));
      };

    const handleSubmit = () => {
        // Calculate section averages and total score
        const sectionScores = {};
        let totalScore = 0;
        
        scoringSections.forEach(section => {
            const scores = Object.values(formState[section.id].scores).filter(score => score !== null);
            const average = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
            const weight = parseInt(section.title.match(/\((\d+)\/100%\)/)[1]);
            const percentageScore = (average / 5) * 100;
            const weightedScore = (percentageScore * weight) / 100;
            
            sectionScores[section.id] = {
                rawAverage: average,
                percentageScore: percentageScore,
                weightedScore: weightedScore,
                maxPoints: weight,
                feedback: formState[section.id].feedback
            };
            
            totalScore += weightedScore;
        });
    
        const submissionData = {
            timestamp: new Date().toISOString(),
            scoringTime: formatTime(time),
            totalScore: Math.round(totalScore * 100) / 100,
            overallFeedback: formState.overallFeedback, // Include overall feedback
            sectionScores,
            rawFormData: formState
        };
    
        console.log('Submission Data:', submissionData);
    };
    

    return (
        <div className="min-h-screen bg-[#171717]">
            <JudgesHeader activeTab="scoring" />
            <div className="container mx-auto p-6">
                <Card className="p-6 bg-[#242424]">
                    <article className="w-full flex flex-col md:flex-row justify-between items-center gap-7 p-7">
                        <div>
                            <h1 className="text-4xl font-bold mb-3 text-[#f6f5f5]">AI Innovators</h1>
                            <p className="text-[#ddd6d6] font-semibold text-base">Pitch Scoring</p>
                        </div>
                        <div>
                            <ScoringTimer 
                                status={status}
                                formattedTime={formatTime(time)}
                                onStart={handleStart}
                                onPause={handlePause}
                                onResume={handleResume}
                                onStop={handleStop}
                                onReset={handleReset}
                                hasStarted={hasStarted}
                            />
                        </div>
                    </article>
                    <div className="space-y-4">
                        <Accordion type="single" collapsible className="w-full">
                            {scoringSections.map((section) => (
                                <AccordionItem value={section.id} key={section.id} className="bg-[#404040] rounded-lg border mb-4">
                                    <AccordionTrigger className="px-4">
                                        <h2 className="font-semibold text-left text-white text-xl">{section.title}</h2>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                        <ScoreSection 
                                            questions={section.questions}
                                            sectionId={section.id}
                                            formState={formState}
                                            onScoreChange={handleScoreChange}
                                            onFeedbackChange={handleFeedbackChange}
                                        />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        <div className="bg-[#404040] rounded-lg border p-4 mt-6">
                            <h2 className="font-semibold text-white mb-4">Overall Feedback</h2>
                            <Textarea 
                                placeholder="Provide your overall feedback about the pitch..."
                                className="min-h-[150px] text-[#f2f0f0]"
                                value={formState.overallFeedback}
                                onChange={(e) => handleOverallFeedbackChange(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end mt-6">
                            <Button 
                                onClick={handleSubmit}
                                className="bg-[#0A2540] text-white px-6 py-2 rounded-lg hover:bg-[#0A2540]/90"
                            >
                                Submit Scores
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}