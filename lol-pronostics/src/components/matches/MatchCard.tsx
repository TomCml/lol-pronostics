import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Match, TeamCode } from '../../types';
import { StyledButton } from '../styled/StyledButton';
import logosData from '../../assets/logos.json';

const TeamLogo = styled('img')`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

const MatchBox = styled(Box)`
  padding: 16px;
  margin-bottom: 8px;
  background-color:rgb(46, 46, 46);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  &:hover {
    background-color: rgba(255, 63, 9, 0.1);
  }
`;

const TeamInfo = styled('div')`
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
  font-size: 1.25rem;
`;

interface MatchCardProps {
  match: Match;
  onBetClick: (team1Logo: string | null, team2Logo: string | null) => void;
}

type LogosType = Record<TeamCode, string>;
const teamLogos = logosData as LogosType;

export const MatchCard = ({ match, onBetClick }: MatchCardProps) => {
  const getModifiedUrl = (url: string | null) => {
    if (!url) return null;
    return url.split('/revision')[0];
  };

  const team1Logo = getModifiedUrl(logosData[match.team1 as TeamCode]);
  const team2Logo = getModifiedUrl(logosData[match.team2 as TeamCode]);

  const handleBetClick = () => {
    onBetClick(team1Logo, team2Logo);
  };

  console.log('Modified URLs:', team1Logo, team2Logo);

  return (
    <MatchBox>
      <TeamInfo>
        {team1Logo && (
          <TeamLogo 
            src={team1Logo} 
            alt={match.team1} 
            loading="lazy"
          />
        )}
        <Typography noWrap>{match.team1} vs {match.team2}</Typography>
        {team2Logo && (
          <TeamLogo 
            src={team2Logo} 
            alt={match.team2}
            loading="lazy"
          />
        )}
      </TeamInfo>
      <StyledButton variant="contained" onClick={handleBetClick} size="small">
        Pronostiquer
      </StyledButton>
    </MatchBox>
  );
};
