import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { Transcript } from '../lib/supabase';
import { api } from '../lib/api';
import { Mic, MicOff, Save, LogOut, Trash2, Edit2, X, Check } from 'lucide-react';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { transcript, isListening, isSupported, startListening, stopListening, resetTranscript, error: speechError } = useSpeechRecognition();

  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [currentText, setCurrentText] = useState('');
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    setCurrentText(transcript);
  }, [transcript]);

  useEffect(() => {
    fetchTranscripts();
  }, []);


  const fetchTranscripts = async () => {
    try {
      const data = await api.getTranscripts();

      if (Array.isArray(data)) {
        setTranscripts(data as Transcript[]);
      } else {
        setTranscripts([]);
      }
    } catch (err) {
      console.error('Error fetching transcripts:', err);
      setError('Failed to load transcripts');
    }
  };


  const handleToggleRecording = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      setCurrentText('');
      startListening(language);
    }
  };

  const handleSaveTranscript = async () => {
    if (!currentText.trim()) {
      setError('No text to save');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.createTranscript(currentText, language);

      setCurrentText('');
      resetTranscript();
      await fetchTranscripts();
    } catch (err) {
      console.error('Error saving transcript:', err);
      setError('Failed to save transcript');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTranscript = async (id: string) => {
    try {
      await api.deleteTranscript(id);
      await fetchTranscripts();
    } catch (err) {
      console.error('Error deleting transcript:', err);
      setError('Failed to delete transcript');
    }
  };

  const handleStartEdit = (transcript: Transcript) => {
    setEditingId(transcript.id);
    setEditText(transcript.text);
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await api.updateTranscript(id, editText);
      setEditingId(null);
      await fetchTranscripts();
    } catch (err) {
      console.error('Error updating transcript:', err);
      setError('Failed to update transcript');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-800">Speech-to-Text AI</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {user?.user_metadata?.name || user?.email}
              </span>
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Record Speech</h2>

              {!isSupported && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg mb-4">
                  Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              {speechError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {speechError}
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="en"
                    checked={language === 'en'}
                    onChange={(e) => setLanguage(e.target.value as 'en')}
                    disabled={isListening}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700 font-medium">English</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="hi"
                    checked={language === 'hi'}
                    onChange={(e) => setLanguage(e.target.value as 'hi')}
                    disabled={isListening}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700 font-medium">हिंदी (Hindi)</span>
                </label>
              </div>

              <div className="flex justify-center mb-6">
                <button
                  aria-label={isListening ? "Stop recording" : "Start recording"}
                  onClick={handleToggleRecording}
                  disabled={!isSupported}
                  className={`p-8 rounded-full transition-all transform hover:scale-105 ${isListening
                      ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                      : 'bg-blue-600 hover:bg-blue-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isListening ? (
                    <MicOff className="w-12 h-12 text-white" />
                  ) : (
                    <Mic className="w-12 h-12 text-white" />
                  )}
                </button>
              </div>

              <p className="text-center text-gray-600 mb-4">
                {isListening ? 'Recording... Click to stop' : 'Click the microphone to start recording'}
              </p>

              <textarea
                value={currentText}
                onChange={(e) => setCurrentText(e.target.value)}
                placeholder="Your transcription will appear here..."
                className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />

              <button
                onClick={handleSaveTranscript}
                disabled={loading || !currentText.trim()}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {loading ? 'Saving...' : 'Save Transcript'}
              </button>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Saved Transcripts</h2>

              {transcripts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No transcripts yet. Start recording to create your first one!</p>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {transcripts.map((transcript) => (
                    <div
                      key={transcript.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            {transcript.language.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(transcript.created_at).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {editingId === transcript.id ? (
                            <>
                              <button
                                aria-label="Save edited transcript"
                                onClick={() => handleSaveEdit(transcript.id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                aria-label="Cancel editing transcript"
                                onClick={handleCancelEdit}
                                className="text-gray-600 hover:text-gray-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                aria-label="Edit transcript"
                                onClick={() => handleStartEdit(transcript)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                aria-label="Delete transcript"
                                onClick={() => handleDeleteTranscript(transcript.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      {editingId === transcript.id ? (
                        <>
                          <label className="sr-only" htmlFor={`edit-${transcript.id}`}>
                            Edit transcript text
                          </label>
                          <textarea
                            id={`edit-${transcript.id}`}
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows={4}
                          />
                        </>
                      ) : (
                        <p className="text-gray-700 whitespace-pre-wrap">{transcript.text}</p>
                      )}

                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
