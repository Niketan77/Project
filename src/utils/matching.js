export function calculateMatchScore(mentor, mentee) {
  let score = 0;
  let reasons = [];
  
  // Input validation
  if (!mentor || !mentee) {
    return { score: 0, reasons: ['Invalid mentor or mentee data'], skillMatches: [] };
  }

  // Ensure required arrays exist
  const mentorExpertise = mentor.expertise || [];
  const menteeSkillsNeeded = mentee.skillsNeeded || [];
  
  // 1. Skills Match (30% weight) - Highest Priority
  const skillMatches = mentorExpertise.filter(skill => 
    menteeSkillsNeeded.includes(skill)
  );
  
  let skillScore = 0;
  if (menteeSkillsNeeded.length > 0) {
    skillScore = (skillMatches.length / menteeSkillsNeeded.length) * 30;
  }
  score += skillScore;
  
  if (skillMatches.length > 0) {
    reasons.push(`${skillMatches.length} matching skills: ${skillMatches.join(', ')}`);
  }

  // 2. Role Function Match (25% weight) - Second Priority
  if (mentor.roleFunction && mentee.desiredRoleFunction) {
    if (mentor.roleFunction === mentee.desiredRoleFunction) {
      score += 25;
      reasons.push(`Perfect role function match: ${mentor.roleFunction}`);
    } else {
      // Related role functions (partial credit)
      const relatedRoleFunctions = {
        'Engineering': ['Engineering', 'Product Management', 'Strategy & Operations'],
        'Marketing': ['Marketing', 'Sales', 'Brand Management'],
        'C-Suite Leadership': ['C-Suite Leadership', 'Strategy & Operations', 'Entrepreneurship'],
        'Entrepreneurship': ['Entrepreneurship', 'C-Suite Leadership', 'Strategy & Operations'],
        'Sales': ['Sales', 'Marketing', 'Business Development'],
        'Product Management': ['Product Management', 'Engineering', 'Strategy & Operations'],
        'Operations': ['Operations', 'Strategy & Operations', 'Engineering'],
        'Finance': ['Finance', 'Strategy & Operations', 'Operations'],
        'Strategy & Operations': ['Strategy & Operations', 'C-Suite Leadership', 'Operations'],
        'Brand Management': ['Brand Management', 'Marketing', 'Sales']
      };
      
      const mentorRelatedRoles = relatedRoleFunctions[mentor.roleFunction] || [];
      if (mentorRelatedRoles.includes(mentee.desiredRoleFunction)) {
        score += 12.5;
        reasons.push(`Related role function: ${mentor.roleFunction} → ${mentee.desiredRoleFunction}`);
      }
    }
  }
  
  // 3. Industry alignment (20% weight) - Third Priority
  if (mentor.industry && mentee.industry) {
    if (mentor.industry === mentee.industry) {
      score += 20;
      reasons.push('Same industry experience');
    } else {
      // Related industries (partial credit)
      const relatedIndustries = {
        'Technology': ['Technology', 'Finance'],
        'Finance': ['Technology', 'Finance', 'Consulting'],
        'Healthcare': ['Healthcare', 'Technology'],
        'Marketing': ['Marketing', 'Technology', 'Retail'],
        'Consulting': ['Consulting', 'Finance', 'Technology']
      };
      
      const mentorRelated = relatedIndustries[mentor.industry] || [];
      if (mentorRelated.includes(mentee.industry)) {
        score += 10;
        reasons.push('Related industry experience');
      }
    }
  }
  
  // 4. Experience level appropriateness (15% weight) - Fourth Priority
  const menteeExpYears = getMenteeExperienceYears(mentee.experienceLevel);
  const mentorExpYears = parseMentorExperience(mentor.yearsExperience);
  
  if (menteeExpYears !== null && mentorExpYears !== null) {
    const expGap = mentorExpYears - menteeExpYears;
    
    // Ideal gap: 3-10 years for effective mentorship
    if (expGap >= 3 && expGap <= 10) {
      score += 15;
      reasons.push('Ideal experience gap for mentorship');
    } else if (expGap >= 2 && expGap <= 12) {
      score += 11;
      reasons.push('Good experience gap for mentorship');
    } else if (expGap >= 1 && expGap <= 15) {
      score += 7;
      reasons.push('Acceptable experience gap');
    }
  }
  
  // 5. Communication style compatibility (10% weight) - Fifth Priority
  if (mentor.communicationStyle && mentee.communicationPreference) {
    if (mentor.communicationStyle === mentee.communicationPreference) {
      score += 10;
      reasons.push('Perfect communication style match');
    } else {
      // Partial matches
      const compatible = areCommStylesCompatible(mentor.communicationStyle, mentee.communicationPreference);
      if (compatible) {
        score += 5;
        reasons.push('Compatible communication styles');
      }
    }
  }
  
  // Additional factors (bonus points, not part of main score)
  const availabilityScore = getAvailabilityScore(mentor.availability);
  if (availabilityScore > 5) {
    score += 2; // Small bonus for high availability
    reasons.push(`${mentor.availability || 'Unknown'} availability for mentoring`);
  }
  
  return {
    score: Math.min(Math.round(score), 100),
    reasons: reasons,
    skillMatches: skillMatches
  };
}

// Helper function to convert mentee experience level to years
function getMenteeExperienceYears(experienceLevel) {
  switch (experienceLevel) {
    case 'Junior': return 1;
    case 'Mid-level': return 4;
    case 'Senior': return 8;
    case 'Career Change': return 2; // Assume some transferable skills
    default: return null;
  }
}

// Helper function to parse mentor years of experience
function parseMentorExperience(yearsExp) {
  if (typeof yearsExp === 'number') {
    return yearsExp;
  }
  
  if (typeof yearsExp === 'string') {
    // Handle cases like "20+", "5", etc.
    if (yearsExp.includes('+')) {
      const baseYears = parseInt(yearsExp.replace('+', ''));
      return isNaN(baseYears) ? null : baseYears;
    }
    
    const parsed = parseInt(yearsExp);
    return isNaN(parsed) ? null : parsed;
  }
  
  return null;
}

// Helper function to check communication style compatibility
function areCommStylesCompatible(mentorStyle, menteeStyle) {
  const compatibilityMap = {
    'Video calls': ['Video calls', 'Phone'],
    'Phone': ['Phone', 'Video calls'],
    'In-person': ['In-person'],
    'Chat': ['Chat', 'Video calls']
  };
  
  const compatible = compatibilityMap[mentorStyle] || [];
  return compatible.includes(menteeStyle);
}

// Helper function to get availability score
function getAvailabilityScore(availability) {
  switch (availability) {
    case 'High': return 10;
    case 'Medium': return 7;
    case 'Low': return 3;
    default: return 0;
  }
}

export function findBestMatches(mentee, mentors, limit = 3) {
  if (!mentee || !Array.isArray(mentors)) {
    return [];
  }
  
  return mentors
    .filter(mentor => {
      // More flexible filtering - include Low availability but with lower scores
      return mentor && 
             mentor.id !== mentee.id && // Don't match with self
             !mentor.matchedMentees?.includes(mentee.id) && // Not already matched
             mentor.availability !== undefined; // Has availability info
    })
    .map(mentor => ({
      mentor,
      ...calculateMatchScore(mentor, mentee)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}