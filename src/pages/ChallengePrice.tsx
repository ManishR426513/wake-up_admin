import { authAxios } from '@/config/config';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { DollarSign, Loader2 } from 'lucide-react';

const ChallengePrice: React.FC = () => {
  const [minPriceText, setMinPriceText] = useState<string>('0');
  const [maxPriceText, setMaxPriceText] = useState<string>('100');
  const [loading, setLoading] = useState<boolean>(false);

  const parsePrice = (value: string): number => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  const getChallengePrice = async () => {
    setLoading(true);
    try {
      const response = await authAxios().get('/challenge/price');
      const { minPrice, maxPrice } = response.data.data;
      setMinPriceText(minPrice.toString());
      setMaxPriceText(maxPrice.toString());
    } catch (err) {
      toast.error('Failed to fetch challenge price range.');
      console.error('Error fetching price:', err);
    } finally {
      setLoading(false);
    }
  };

  const validatePriceRange = (): string | null => {
    const min = parsePrice(minPriceText);
    const max = parsePrice(maxPriceText);

    if (min < 1) return 'Minimum price must be at least $1';
    if (max > 100) return 'Maximum price must not exceed $100';
    if (max <= min) return 'Maximum price must be greater than minimum price';
    if (max - min < 4) return 'Price range should be at least $4';
    return null;
  };

  const updateChallengePrice = async () => {
    const error = validatePriceRange();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);
    try {
      await authAxios().put('/challenge/price', {
        minPrice: parsePrice(minPriceText),
        maxPrice: parsePrice(maxPriceText),
      });
      toast.success('Price range updated successfully!');
    } catch (err) {
      toast.error('Failed to update price range.');
      console.error('Error updating price:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChallengePrice();
  }, []);

  return (
    <> 
     <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <DollarSign className="h-6 w-6" />
            Set Challenge Price
          </CardTitle>
          <CardDescription>
            Configure the minimum and maximum price range for challenges.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-muted/50 p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">Current Range</div>
            <div className="text-2xl font-bold">
              ${parsePrice(minPriceText).toFixed(2)} — ${parsePrice(maxPriceText).toFixed(2)}
            </div>
          </div>

          <Separator />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="min-price">Minimum Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="min-price"
                  type="text"
                  value={minPriceText}
                  onChange={(e) => setMinPriceText(e.target.value)}
                  className="pl-9"
                  placeholder="1.00"
                />
              </div>
              <p className="text-xs text-muted-foreground">Minimum: $1</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-price">Maximum Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="max-price"
                  type="text"
                  value={maxPriceText}
                  onChange={(e) => setMaxPriceText(e.target.value)}
                  className="pl-9"
                  placeholder="100.00"
                />
              </div>
              <p className="text-xs text-muted-foreground">Maximum: $100</p>
            </div>
          </div>

          <Button
            onClick={updateChallengePrice}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Price Range'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
   
    </>
    
  );
};

export default ChallengePrice;
