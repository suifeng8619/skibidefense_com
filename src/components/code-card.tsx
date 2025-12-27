"use client";

import { useState } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";
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

type CopyStatus = "idle" | "success" | "error";

export function CodeCard({ codeData }: CodeCardProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const isActive = codeData.status === "active";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeData.code);
      setCopyStatus("success");
      setTimeout(() => setCopyStatus("idle"), 3000);
    } catch {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 3000);
    }
  };

  const getCopyIcon = () => {
    switch (copyStatus) {
      case "success":
        return <Check className="h-4 w-4 text-green-400" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Copy className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getCopyLabel = () => {
    switch (copyStatus) {
      case "success":
        return "Copied!";
      case "error":
        return "Copy failed";
      default:
        return `Copy code ${codeData.code}`;
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
              className="p-2 hover:bg-accent rounded-md transition-colors flex items-center gap-1"
              onClick={handleCopy}
              aria-label={getCopyLabel()}
              title={getCopyLabel()}
            >
              {getCopyIcon()}
              {copyStatus !== "idle" && (
                <span className={`text-xs ${copyStatus === "success" ? "text-green-400" : "text-red-400"}`}>
                  {copyStatus === "success" ? "Copied!" : "Failed"}
                </span>
              )}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
