/**
 * Route for SKIN-TWIN Formulation Proof Assistant
 */

import type { MetaFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

import { ProofAssistant } from '~/components/proof-assistant/ProofAssistant';

export const meta: MetaFunction = () => {
  return [
    { title: 'SKIN-TWIN Formulation Proof Assistant' },
    {
      name: 'description',
      content:
        'Cognitive proof assistant for formal verification of skincare formulation hypotheses using multi-scale skin model interactions.',
    },
  ];
};

export async function loader() {
  // Sample ingredients data - would normally come from vessels/ data
  const availableIngredients = [
    {
      id: 'R000001',
      label: 'Hyaluronic Acid',
      inci_name: 'Sodium Hyaluronate',
      category: 'Active Compound',
      molecular_weight: 1500000,
      safety_rating: 'high',
    },
    {
      id: 'R000002',
      label: 'Niacinamide',
      inci_name: 'Niacinamide',
      category: 'Active Compound',
      molecular_weight: 122.12,
      safety_rating: 'high',
    },
    {
      id: 'R000003',
      label: 'Vitamin C',
      inci_name: 'L-Ascorbic Acid',
      category: 'Active Compound',
      molecular_weight: 176.12,
      safety_rating: 'medium',
    },
    {
      id: 'R000004',
      label: 'Retinol',
      inci_name: 'Retinol',
      category: 'Active Compound',
      molecular_weight: 286.45,
      safety_rating: 'medium',
    },
    {
      id: 'R000005',
      label: 'Salicylic Acid',
      inci_name: 'Salicylic Acid',
      category: 'Active Compound',
      molecular_weight: 138.12,
      safety_rating: 'medium',
    },
    {
      id: 'R000006',
      label: 'Glycerine',
      inci_name: 'Glycerin',
      category: 'Base/Carrier',
      molecular_weight: 92.09,
      safety_rating: 'high',
    },
    {
      id: 'R000007',
      label: 'Ceramide NP',
      inci_name: 'Ceramide NP',
      category: 'Active Compound',
      molecular_weight: 537.85,
      safety_rating: 'high',
    },
    {
      id: 'R000008',
      label: 'Peptide Complex',
      inci_name: 'Palmitoyl Pentapeptide-4',
      category: 'Active Compound',
      molecular_weight: 802.04,
      safety_rating: 'high',
    },
    {
      id: 'R000009',
      label: 'Alpha Arbutin',
      inci_name: 'Alpha-Arbutin',
      category: 'Active Compound',
      molecular_weight: 272.25,
      safety_rating: 'high',
    },
    {
      id: 'R000010',
      label: 'Caffeine',
      inci_name: 'Caffeine',
      category: 'Active Compound',
      molecular_weight: 194.19,
      safety_rating: 'high',
    },
  ];

  return json({
    availableIngredients,
  });
}

export default function ProofAssistantRoute() {
  const { availableIngredients } = useLoaderData<typeof loader>();

  const handleVerificationComplete = (result: any) => {
    console.log('Verification completed:', result);

    // Could save results, trigger notifications, etc.
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProofAssistant
        availableIngredients={availableIngredients}
        onVerificationComplete={handleVerificationComplete}
        initialHypothesis="Combining hyaluronic acid with niacinamide will enhance skin hydration and barrier function through synergistic mechanisms"
      />
    </div>
  );
}
