import { gql } from './__generated__';

export const LIST_ALL_SKILLS = gql(`
	query ListAllSkills {
	  listAllSkills {
		 _id
		 title
		 description
		 status
	  }
	}
 `);
