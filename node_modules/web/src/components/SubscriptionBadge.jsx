
import React from 'react';
import { Crown } from 'lucide-react';

export default function SubscriptionBadge({ tier }) {
  if (tier === 'premium') {
    return (
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-full font-medium text-sm">
        <Crown className="w-4 h-4" />
        Premium
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-full font-medium text-sm">
      Gratuito
    </div>
  );
}
