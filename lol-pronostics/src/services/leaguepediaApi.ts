import axios from 'axios';

const API_BASE_URL = 'https://lol.fandom.com/api.php';

interface ImageResponse {
  query: {
    pages: {
      [key: string]: {
        imageinfo: Array<{
          url: string;
          thumburl?: string;
        }>;
      };
    };
  };
}

const DEFAULT_LOGO = 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/88/LFL_2021_logo.png';

export const leaguepediaApi = {
  getTeamLogo: async (teamName: string): Promise<string> => {
    try {
      const fileVariants = [
        `${teamName} logo square.png`,
        `${teamName}logo square.png`,
        `${teamName} logo.png`,
        `${teamName}logo.png`
      ];

      for (const fileName of fileVariants) {
        try {
          const response = await axios.get<ImageResponse>(API_BASE_URL, {
            params: {
              action: 'query',
              format: 'json',
              titles: `File:${fileName}`,
              prop: 'imageinfo',
              iiprop: 'url',
              origin: '*'
            }
          });

          const pageId = Object.keys(response.data.query.pages)[0];
          if (pageId !== '-1' && response.data.query.pages[pageId].imageinfo?.[0]) {
            return response.data.query.pages[pageId].imageinfo[0].url;
          }
        } catch (e) {
          continue;
        }
      }

      return DEFAULT_LOGO;
    } catch (error) {
      console.error(`Failed to fetch logo for team ${teamName}:`, error);
      return DEFAULT_LOGO;
    }
  },

  getCompetitionLogo: async (competitionName: string): Promise<string> => {
    try {
      const fileVariants = [
        `${competitionName} logo.png`,
        `${competitionName}logo.png`,
        `${competitionName} allstars.png`,
        `${competitionName} 2024 logo.png`
      ];

      for (const fileName of fileVariants) {
        try {
          const response = await axios.get<ImageResponse>(API_BASE_URL, {
            params: {
              action: 'query',
              format: 'json',
              titles: `File:${fileName}`,
              prop: 'imageinfo',
              iiprop: 'url',
              origin: '*'
            }
          });

          const pageId = Object.keys(response.data.query.pages)[0];
          if (pageId !== '-1' && response.data.query.pages[pageId].imageinfo?.[0]) {
            return response.data.query.pages[pageId].imageinfo[0].url;
          }
        } catch (e) {
          continue;
        }
      }

      return DEFAULT_LOGO;
    } catch (error) {
      console.error(`Failed to fetch logo for competition ${competitionName}:`, error);
      return DEFAULT_LOGO;
    }
  }
};

export {};
