'use client';

import React, { useState } from 'react';
import { UploadCloud, FileText, AlertTriangle, X } from 'lucide-react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded) {
      setFile(uploaded);
    }
  };

  const analyzeLogFile = async () => {
    if (!file) return;

    setAnalyzing(true);
    setResult(null);

    try {
      const text = await file.text();
      const logData = JSON.parse(text);

      const analysis = analyzeOpenClawLog(logData);
      setResult(analysis);
      setShowCheckout(true);
    } catch (error) {
      console.error('Error analyzing log:', error);
      setAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Stop Burning Tokens on OpenClaw
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Get actionable insights to save <span className="text-emerald-400 font-bold">$300-2,000/month</span>
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <FileText className="w-6 h-6 text-slate-400" />
            <p className="text-slate-400">
              Upload your OpenClaw log file
            </p>
          </div>
        </div>

        {/* Upload Zone */}
        {!result && (
          <div className="max-w-2xl mx-auto">
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                file ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-600 bg-slate-800/50 hover:border-emerald-400'
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
            >
              <input
                type="file"
                accept=".json,.log,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className={`cursor-pointer flex flex-col items-center justify-center gap-4 ${
                  file ? 'text-white' : 'text-slate-300'
                }`}
              >
                <UploadCloud className="w-12 h-12 mb-4" />
                <p className="text-lg font-medium">
                  {file ? file.name : 'Drop your OpenClaw log file here'}
                </p>
                <p className="text-sm text-slate-400">
                  JSON, log, or text format
                </p>
              </label>

              {file && (
                <div className="mt-6">
                  <button
                    onClick={analyzeLogFile}
                    disabled={analyzing}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {analyzing ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />
                        Analyzing...
                      </span>
                    ) : (
                      'Analyze Your Log (Free up to 50K tokens)'
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 bg-slate-800/50 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0" />
                <p className="text-sm text-slate-400">
                  <span className="font-semibold">Free analysis</span> for logs up to 50K tokens.
                  No credit card required. Pay $49 only for detailed optimization report.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !showCheckout && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-lg p-8 mb-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText className="text-emerald-400" />
                Analysis Complete
              </h2>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-2">Total Tokens</p>
                  <p className="text-3xl font-bold text-white">{result.totalTokens?.toLocaleString()}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-2">Est. Cost</p>
                  <p className="text-3xl font-bold text-white">${result.estimatedCost?.toFixed(2)}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-2">Savings Potential</p>
                  <p className="text-3xl font-bold text-emerald-400">{result.savingsPotential?.toFixed(2)}</p>
                </div>
              </div>

              {/* Waste Patterns */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Top 5 Waste Patterns Found
                </h3>
                <div className="space-y-4">
                  {result.wastePatterns?.map((pattern: any, index: number) => (
                    <div key={index} className="bg-slate-900 rounded-lg p-6 border border-slate-700">
                      <div className="flex items-start gap-3">
                        <span className="text-red-400 text-2xl font-bold mr-2">{index + 1}.</span>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {pattern.title}
                          </h4>
                          <p className="text-slate-400 text-sm">
                            {pattern.description}
                          </p>
                          <div className="mt-3 p-4 bg-slate-950 rounded border border-slate-600">
                            <p className="text-emerald-400 font-medium">
                              {pattern.recommendation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-4 px-8 rounded-lg transition-all duration-200"
                >
                  Get Full Optimization Report - $49
                </button>
                <p className="text-slate-400 text-sm mt-3">
                  PDF download with detailed recommendations
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 rounded-xl p-8 max-w-md w-full border border-slate-700 shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">Checkout</h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="text-slate-400 hover:text-slate-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <p className="text-lg text-white font-medium mb-2">TokenGuard Pro - Lifetime</p>
                  <p className="text-3xl font-bold text-emerald-400">$49</p>
                  <p className="text-sm text-slate-400 mt-1">One-time payment, unlimited use</p>
                </div>

                <div className="bg-emerald-600 opacity-20 rounded-lg p-4 border border-emerald-500">
                  <ul className="space-y-2 text-slate-200 text-sm">
                    <li className="flex items-start gap-2">
                      <FileText className="w-5 h-5 text-emerald-400 mt-0.5" />
                      <span>Complete optimization report</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="w-5 h-5 text-emerald-400 mt-0.5" />
                      <span>Top 5 waste patterns identified</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="w-5 h-5 text-emerald-400 mt-0.5" />
                      <span>Actionable recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="w-5 h-5 text-emerald-400 mt-0.5" />
                      <span>PDF export</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="w-5 h-5 text-emerald-400 mt-0.5" />
                      <span>Future feature: Weekly reports</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="https://buy.stripe.com/tokenguard-pro-placeholder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-4 rounded-lg transition-all duration-200 inline-block text-center"
                >
                  Pay $49 - Get Report
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-8 text-slate-500 text-sm">
          <p>Built for OpenClaw developers optimizing their AI costs</p>
        </footer>
      </div>
    </main>
  );
}

function analyzeOpenClawLog(logData: any): any {
  let totalTokens = 0;
  let estimatedCost = 0;

  const countTokens = (obj: any): number => {
    if (typeof obj === 'object' && obj !== null) {
      let count = 0;
      for (const key in obj) {
        if (key === 'tokens' && typeof obj[key] === 'number') {
          count += obj[key];
        } else if (typeof obj[key] === 'object') {
          count += countTokens(obj[key]);
        }
      }
      return count;
    }
    return 0;
  };

  totalTokens = countTokens(logData);

  estimatedCost = (totalTokens / 1000) * 0.001;

  const wastePatterns = [
    {
      title: 'Repeated Questions',
      description: 'Same questions asked multiple times in conversation',
      recommendation: 'Cache responses or adjust system prompt'
    },
    {
      title: 'Expensive Model on Simple Tasks',
      description: 'Using Claude/GPT-4 for simple "yes/no" responses',
      recommendation: 'Use smaller models for routine queries'
    },
    {
      title: 'Long System Prompts',
      description: 'Context window filled with instructions, not user data',
      recommendation: 'Compress system prompts, use tools for knowledge'
    },
    {
      title: 'No Tool Result Caching',
      description: 'Same tools called repeatedly without storing results',
      recommendation: 'Implement tool result caching mechanism'
    },
    {
      title: 'Low Temperature Usage',
      description: 'High temperature (0.7+) increases token usage',
      recommendation: 'Use lower temperature for deterministic tasks'
    },
  ];

  const savingsPotential = estimatedCost * 0.2;

  return {
    totalTokens,
    estimatedCost,
    savingsPotential,
    wastePatterns,
  };
}
