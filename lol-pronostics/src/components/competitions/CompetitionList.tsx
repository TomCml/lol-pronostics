import { List, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { leaguepediaApi } from '../../services/leaguepediaApi';
import { Competition } from '../../types';
import { CompetitionItem } from './CompetitionItem';
import { Loader } from '../common/Loader';

const StyledList = styled(List)`
  background-color: var(--primary-color);
  border-right: 1px solid var(--secondary-color);
  height: calc(100vh - 160px);
  overflow-y: auto;
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

interface CompetitionListProps {
  competitions: Competition[];
  selectedCompetition: number | null;
  onSelectCompetition: (id: number) => void;
}

export const CompetitionList = ({ competitions, selectedCompetition, onSelectCompetition }: CompetitionListProps) => {
  return (
    <>
      <Typography variant="h6" sx={{ my: 2 }}>
        Compétitions
      </Typography>
      <StyledList>
        {competitions.map((competition) => (
          <CompetitionItem
            key={competition.id}
            competition={competition}
            isSelected={selectedCompetition === competition.id}
            onClick={() => onSelectCompetition(competition.id)}
          />
        ))}
      </StyledList>
    </>
  );
};
