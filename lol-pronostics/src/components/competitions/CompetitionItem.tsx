import { ListItem, ListItemText, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Competition } from '../../types';

const StyledListItem = styled(ListItemButton)`
  &.Mui-selected {
    background-color: var(--secondary-color);
    &:hover {
      background-color: var(--secondary-color);
    }
  }
  &:hover {
    background-color: rgba(255, 63, 9, 0.1);
  }
  padding: 0;
  height: 80px; // Hauteur fixe plus petite
`;

const CompetitionLogo = styled('img')`
  width: 80px; // Plus petit conteneur
  height: 48px;
  object-fit: contain; 
  margin: 0;
  margin-right: 12px;
  padding: 0;
  border-radius: 50%;
`;

interface CompetitionItemProps {
  competition: Competition;
  isSelected: boolean;
  onClick: () => void;
}

const getShortName = (name: string): string => {
  return name.split(' ')[0]; 
};

export const CompetitionItem = ({ competition, isSelected, onClick }: CompetitionItemProps) => {
  const shortName = getShortName(competition.name).toLowerCase();
  let competitionLogo;
  
  try {
    competitionLogo = require(`../../assets/${shortName}.png`);
  } catch (e) {
    console.log(`Logo not found for ${shortName}`);
    competitionLogo = null;
  }

  return (
    <ListItem disablePadding>
      <StyledListItem selected={isSelected} onClick={onClick}>
        {competitionLogo && (
          <CompetitionLogo 
            src={competitionLogo} 
            alt={competition.name} 
          />
        )}
        <ListItemText 
          primary={competition.name}
          primaryTypographyProps={{ style: { fontSize: '1.1rem' } }}
        />
      </StyledListItem>
    </ListItem>
  );
};
