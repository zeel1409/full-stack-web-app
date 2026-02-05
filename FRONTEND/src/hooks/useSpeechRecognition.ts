
import { useState, useEffect, useRef, useCallback } from "react";

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  [index: number]: {
    readonly transcript: string;
    readonly confidence: number;
  };
}

interface SpeechRecognitionEvent {
  readonly resultIndex: number;
  readonly results: {
    readonly length: number;
    [index: number]: SpeechRecognitionResult;
  };
}

interface SpeechRecognitionErrorEvent {
  readonly error: string;
  readonly message?: string;
}

interface SpeechRecognitionHook {
  transcript: string;
  isListening: boolean;
  isSupported: boolean;
  startListening: (language: string) => void;
  stopListening: () => void;
  resetTranscript: () => void;
  error: string | null;
}

interface MySpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: {
      new (): MySpeechRecognition;
    };
    webkitSpeechRecognition?: {
      new (): MySpeechRecognition;
    };
  }
}

export function useSpeechRecognition(): SpeechRecognitionHook {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<MySpeechRecognition | null>(null);

  const SpeechRecognitionAPI =
    typeof window !== "undefined" 
      ? (window.SpeechRecognition || window.webkitSpeechRecognition) 
      : null;

  const isSupported = !!SpeechRecognitionAPI;

  useEffect(() => {
    if (!isSupported || !SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcriptPiece = result[0].transcript;

        if (result.isFinal) {
          finalTranscript += transcriptPiece + " ";
        }
      }

      if (finalTranscript.trim()) {
        setTranscript((prev) => prev + finalTranscript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognitionRef.current?.stop();
    };
  }, [isSupported, SpeechRecognitionAPI]);

  const startListening = useCallback((language: string) => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.lang = language === "hi" ? "hi-IN" : "en-US";
      recognitionRef.current.start();
      setError(null);
    } catch (err) {
      console.error("Error starting recognition:", err);
      setError("Failed to start speech recognition");
    }
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setError(null);
  }, []);

  return {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    error,
  };
}








































































































































// import { useState, useEffect, useRef, useCallback } from "react";


// interface SpeechRecognitionHook {
//   transcript: string;
//   isListening: boolean;
//   isSupported: boolean;
//   startListening: (language: string) => void;
//   stopListening: () => void;
//   resetTranscript: () => void;
//   error: string | null;
// }


// interface MySpeechRecognition {
//   continuous: boolean;
//   interimResults: boolean;
//   lang: string;
//   start: () => void;
//   stop: () => void;
//   onstart: (() => void) | null;
//   onend: (() => void) | null;
//   onresult: ((event: any) => void) | null;
//   onerror: ((event: any) => void) | null;
// }

// /**
//  * Extend Window safely (no circular types)
//  */
// declare global {
//   interface Window {
//     SpeechRecognition?: {
//       new (): MySpeechRecognition;
//     };
//     webkitSpeechRecognition?: {
//       new (): MySpeechRecognition;
//     };
//   }
// }

// export function useSpeechRecognition(): SpeechRecognitionHook {
//   const [transcript, setTranscript] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const recognitionRef = useRef<MySpeechRecognition | null>(null);

//   const SpeechRecognitionAPI =
//     window.SpeechRecognition || window.webkitSpeechRecognition;

//   const isSupported = !!SpeechRecognitionAPI;

//   useEffect(() => {
//     if (!isSupported || !SpeechRecognitionAPI) return;

//     const recognition = new SpeechRecognitionAPI();

//     recognition.continuous = true;
//     recognition.interimResults = true;

//     recognition.onstart = () => {
//       setIsListening(true);
//       setError(null);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognition.onresult = (event: any) => {
//       let finalTranscript = "";

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const result = event.results[i];
//         const transcriptPiece = result[0].transcript;

//         if (result.isFinal) {
//           finalTranscript += transcriptPiece + " ";
//         }
//       }

//       if (finalTranscript.trim()) {
//         setTranscript((prev) => prev + finalTranscript);
//       }
//     };

//     recognition.onerror = (event: any) => {
//       console.error("Speech recognition error:", event.error);
//       setError(`Speech recognition error: ${event.error}`);
//       setIsListening(false);
//     };

//     recognitionRef.current = recognition;

//     return () => {
//       recognitionRef.current?.stop();
//     };
//   }, [isSupported, SpeechRecognitionAPI]);

//   const startListening = useCallback((language: string) => {
//     if (!recognitionRef.current) return;

//     try {
//       recognitionRef.current.lang =
//         language === "hi" ? "hi-IN" : "en-US";
//       recognitionRef.current.start();
//       setError(null);
//     } catch (err) {
//       console.error("Error starting recognition:", err);
//       setError("Failed to start speech recognition");
//     }
//   }, []);

//   const stopListening = useCallback(() => {
//     recognitionRef.current?.stop();
//   }, []);

//   const resetTranscript = useCallback(() => {
//     setTranscript("");
//     setError(null);
//   }, []);

//   return {
//     transcript,
//     isListening,
//     isSupported,
//     startListening,
//     stopListening,
//     resetTranscript,
//     error,
//   };
// }
