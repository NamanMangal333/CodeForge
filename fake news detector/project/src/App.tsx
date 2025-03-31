import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Info, Search, Shield } from 'lucide-react';

function App() {
  const [newsText, setNewsText] = useState('');
  const [result, setResult] = useState<null | {
    credibility: number;
    flags: string[];
    verdict: 'reliable' | 'suspicious' | 'fake' | 'Correct news';
  }>(null);

  const analyzeNews = () => {
    // This is a mock analysis - in a real app, you'd connect to an AI model or API
    const mockAnalysis = {
      credibility: Math.random() * 100,
      flags: ['Emotional language', 'Unverified sources', 'Clickbait title'],
      verdict: Math.random() > 0.5 ? 'reliable' : 'suspicious'
    } as const;
    
    setResult(mockAnalysis);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg- to-blue-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">VAASTAVIK</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Verify Your News
            </h2>
            <p className="text-gray-600">
              Paste your article or news content below to check its credibility.
            </p>
          </div>

          <textarea
            className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Paste your news article here..."
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
          />

          <button
            onClick={analyzeNews}
            disabled={!newsText.trim()}
            className="mt-4 flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Search className="w-5 h-5 mr-2" />
            Analyze Content
          </button>

          {result && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Analysis Results</h3>
              
              <div className="flex items-center mb-4">
                {result.verdict === 'reliable' ? (
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
                )}
                <span className="text-lg font-medium">
                  {result.verdict === 'reliable' ? 'Content appears reliable' : 'Suspicious content detected'}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Credibility Score</span>
                  <span className="font-medium">{result.credibility.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      result.credibility > 70
                        ? 'bg-green-500'
                        : result.credibility > 40
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${result.credibility}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-800">Detected Issues:</h4>
                    <ul className="mt-2 space-y-1">
                      {result.flags.map((flag, index) => (
                        <li key={index} className="text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                          {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-indigo-600" />
              <h3 className="ml-2 text-lg font-semibold">AI-Powered Analysis</h3>
            </div>
            <p className="text-gray-600">Advanced algorithms analyze content patterns and linguistic markers.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="ml-2 text-lg font-semibold">Instant Results</h3>
            </div>
            <p className="text-gray-600">Get immediate feedback on content credibility and potential red flags.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <Info className="w-6 h-6 text-blue-600" />
              <h3 className="ml-2 text-lg font-semibold">Detailed Insights</h3>
            </div>
            <p className="text-gray-600">Comprehensive analysis with specific issues and credibility metrics.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;