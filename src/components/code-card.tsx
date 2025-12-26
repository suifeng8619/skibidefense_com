"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Code {
  code: string;
  reward: string;
  status: "active" | "expired";
  addedDate: string;
}

interface CodeCardProps {
  codeData: Code;
}

export function CodeCard({ codeData }: CodeCardProps) {
  const [copied, setCopied] = useState(false);
  const isActive = codeData.status === "active";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeData.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  return (
    <Card className={!isActive ? "opacity-60" : ""}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <code className="text-lg font-mono font-bold text-yellow-400">
                {codeData.code}
              </code>
              <Badge
                variant={isActive ? "default" : "secondary"}
                className={isActive ? "bg-green-500/20 text-green-400 border-green-500" : ""}
              >
                {isActive ? "Active" : "Expired"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{codeData.reward}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Added: {codeData.addedDate}
            </p>
          </div>
          {isActive && (
            <button
              className="p-2 hover:bg-accent rounded-md transition-colors"
              onClick={handleCopy}
              title="Copy code"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
