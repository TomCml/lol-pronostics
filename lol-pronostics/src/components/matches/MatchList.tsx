import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Match } from '../../types';
import { MatchCard } from './MatchCard';

interface MatchListProps {
  matches: Match[];
  onMatchSelect: (match: Match) => void;
}

const ScrollableBox = styled(Box)`
  height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 0 16px;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: var(--primary-color);
  }
  &::-webkit-scrollbar-thumb {
    background: var(--secondary-color);
    border-radius: 4px;
  }
`;

const GridLayout = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 24px;
  padding: 16px;
`;

export const MatchList = ({ matches, onMatchSelect }: MatchListProps) => (
  <>
    <Typography variant="h6" sx={{ my: 2, px: 2 }}>
      Matches
    </Typography>
    <ScrollableBox>
      <GridLayout>
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            onBetClick={() => onMatchSelect(match)}
          />
        ))}
      </GridLayout>
    </ScrollableBox>
  </>
);
