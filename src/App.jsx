import { Check, Copy, RefreshCw, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const [isSmallTrue, setIsSmallTrue] = useState(true);
  const [isCapsTrue, setIsCapsTrue] = useState(true);
  const [isNumbersTrue, setIsNumbersTrue] = useState(true);
  const [isSymbolsTrue, setIsSymbolsTrue] = useState(false);
  const smallAlphabets = "abcdefghijklmnopqrstuvwxyz";
  const capitalAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  const [password, setPassword] = useState("");
  const [rangeValue, setRangeValue] = useState(12);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  function passwordGenerator() {
    setIsGenerating(true);
    setCopied(false);

    let passAlphabets = "";

    if (isSmallTrue) passAlphabets += smallAlphabets;
    if (isCapsTrue) passAlphabets += capitalAlphabets;
    if (isNumbersTrue) passAlphabets += numbers;
    if (isSymbolsTrue) passAlphabets += symbols;

    if (passAlphabets === "") {
      setPassword("");
      setIsGenerating(false);
      return;
    }

    let generatedPassword = "";
    const array = new Uint32Array(rangeValue);
    crypto.getRandomValues(array);

    for (let i = 0; i < rangeValue; i++) {
      generatedPassword += passAlphabets[array[i] % passAlphabets.length];
    }

    setTimeout(() => {
      setPassword(generatedPassword);
      setIsGenerating(false);
    }, 400);
  }

  useEffect(() => {
    passwordGenerator();
  }, [rangeValue, isSmallTrue, isCapsTrue, isNumbersTrue, isSymbolsTrue]);

  const handleCopy = () => {
    setCopied(true);
    toast.success("Password copied to clipboard", {
      style: {
        background: "#4f46e5",
        color: "white",
        border: "none",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: "500",
      },
      icon: "✨",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Elegant background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Password Generator
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              Create secure passwords with elegance
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 p-8 relative overflow-hidden">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-indigo-500/5 rounded-3xl"></div>

            {/* Password Display */}
            <div className="relative mb-8">
              <div
                className={`bg-white/10 rounded-2xl p-6 border border-white/20 transition-all duration-500 ${
                  isGenerating ? "animate-pulse" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                      Generated Password
                    </div>
                    <div className="text-xl font-mono text-white break-all leading-relaxed">
                      {password || "Configure options below"}
                    </div>
                  </div>
                  <div className="flex gap-3 ml-4">
                    <CopyToClipboard text={password} onCopy={handleCopy}>
                      <button
                        className={`p-3 rounded-xl transition-all duration-300 ${
                          copied
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                            : "bg-white/10 text-white hover:bg-white/20 hover:shadow-lg hover:shadow-white/10"
                        }`}
                        disabled={!password}
                      >
                        {copied ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </CopyToClipboard>
                    <button
                      onClick={passwordGenerator}
                      disabled={isGenerating}
                      className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCw
                        className={`w-5 h-5 ${
                          isGenerating ? "animate-spin" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Character Types */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Character Types
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    id: "small",
                    label: "Lowercase",
                    sublabel: "a-z",
                    state: isSmallTrue,
                    setState: setIsSmallTrue,
                  },
                  {
                    id: "caps",
                    label: "Uppercase",
                    sublabel: "A-Z",
                    state: isCapsTrue,
                    setState: setIsCapsTrue,
                  },
                  {
                    id: "numbers",
                    label: "Numbers",
                    sublabel: "0-9",
                    state: isNumbersTrue,
                    setState: setIsNumbersTrue,
                  },
                  {
                    id: "symbols",
                    label: "Symbols",
                    sublabel: "!@#$",
                    state: isSymbolsTrue,
                    setState: setIsSymbolsTrue,
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`group relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      item.state
                        ? "bg-indigo-500/20 border-indigo-400/50 shadow-lg shadow-indigo-500/10"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          item.state
                            ? "bg-indigo-600 shadow-lg"
                            : "bg-white/20 group-hover:bg-white/30"
                        }`}
                      >
                        {item.state && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <input
                        type="checkbox"
                        className="sr-only"
                        onChange={() => item.setState(!item.state)}
                        checked={item.state}
                      />
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {item.label}
                        </div>
                        <div className="text-xs text-slate-400">
                          {item.sublabel}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Password Length */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  Length
                </h3>
                <div className="px-4 py-2 bg-indigo-600 rounded-xl text-white font-bold text-lg shadow-lg">
                  {rangeValue}
                </div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min={4}
                  max={32}
                  value={rangeValue}
                  onChange={(e) => setRangeValue(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>4</span>
                  <span>32</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-xs text-slate-500 font-medium">
                Secure • Local • Private
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
