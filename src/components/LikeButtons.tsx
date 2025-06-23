
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface LikeButtonsProps {
  itemType: 'artist' | 'album' | 'article';
  itemId: string;
  className?: string;
}

const LikeButtons = ({ itemType, itemId, className }: LikeButtonsProps) => {
  const [userLike, setUserLike] = useState<boolean | null>(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLikeData();
  }, [itemType, itemId]);

  const fetchLikeData = async () => {
    try {
      // Get total likes and dislikes
      const { data: allLikes } = await supabase
        .from('likes')
        .select('is_like')
        .eq('item_type', itemType)
        .eq('item_id', itemId);

      if (allLikes) {
        const likeCount = allLikes.filter(like => like.is_like).length;
        const dislikeCount = allLikes.filter(like => !like.is_like).length;
        setLikes(likeCount);
        setDislikes(dislikeCount);
      }

      // Get current user's like status (if authenticated)
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userLikeData } = await supabase
          .from('likes')
          .select('is_like')
          .eq('item_type', itemType)
          .eq('item_id', itemId)
          .eq('user_id', user.id)
          .maybeSingle();

        setUserLike(userLikeData?.is_like ?? null);
      }
    } catch (error) {
      console.error('Error fetching like data:', error);
    }
  };

  const handleLike = async (isLike: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to like/dislike items",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      if (userLike === isLike) {
        // Remove like/dislike if clicking the same button
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('item_type', itemType)
          .eq('item_id', itemId)
          .eq('user_id', user.id);

        if (error) throw error;
        setUserLike(null);
      } else {
        // Upsert like/dislike
        const { error } = await supabase
          .from('likes')
          .upsert({
            user_id: user.id,
            item_type: itemType,
            item_id: itemId,
            is_like: isLike
          });

        if (error) throw error;
        setUserLike(isLike);
      }

      // Refresh counts
      await fetchLikeData();
    } catch (error) {
      console.error('Error updating like:', error);
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <Button
        variant={userLike === true ? "default" : "outline"}
        size="sm"
        onClick={() => handleLike(true)}
        disabled={loading}
        className={userLike === true ? "bg-green-600 hover:bg-green-700" : ""}
      >
        <ThumbsUp className="w-4 h-4 mr-1" />
        {likes}
      </Button>
      
      <Button
        variant={userLike === false ? "default" : "outline"}
        size="sm"
        onClick={() => handleLike(false)}
        disabled={loading}
        className={userLike === false ? "bg-red-600 hover:bg-red-700" : ""}
      >
        <ThumbsDown className="w-4 h-4 mr-1" />
        {dislikes}
      </Button>
    </div>
  );
};

export default LikeButtons;
