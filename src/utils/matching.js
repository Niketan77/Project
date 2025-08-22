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
  
  // Expertise overlap (35% weight) - Fixed division by zero
  const skillMatches = mentorExpertise.filter(skill => 
    menteeSkillsNeeded.includes(skill)
  );
  
  let skillScore = 0;
  if (menteeSkillsNeeded.length > 0) {
    skillScore = (skillMatches.length / menteeSkillsNeeded.length) * 35;
  }
  score += skillScore;
  
  if (skillMatches.length > 0) {
    reasons.push(`${skillMatches.length} matching skills: ${skillMatches.join(', ')}`);
  }
  
  // Industry alignment (20% weight) - Improved logic
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
  
  // Experience level appropriateness (20% weight) - Fixed logic
  const menteeExpYears = getMenteeExperienceYears(mentee.experienceLevel);
  const mentorExpYears = parseMentorExperience(mentor.yearsExperience);
  
  if (menteeExpYears !== null && mentorExpYears !== null) {
    const expGap = mentorExpYears - menteeExpYears;
    
    // Ideal gap: 3-10 years for effective mentorship
    if (expGap >= 3 && expGap <= 10) {
      score += 20;
      reasons.push('Ideal experience gap for mentorship');
    } else if (expGap >= 2 && expGap <= 12) {
      score += 15;
      reasons.push('Good experience gap for mentorship');
    } else if (expGap >= 1 && expGap <= 15) {
      score += 10;
      reasons.push('Acceptable experience gap');
    }
  }
  
  // Communication style compatibility (15% weight) - New feature
  if (mentor.communicationStyle && mentee.communicationPreference) {
    if (mentor.communicationStyle === mentee.communicationPreference) {
      score += 15;
      reasons.push('Perfect communication style match');
    } else {
      // Partial matches
      const compatible = areCommStylesCompatible(mentor.communicationStyle, mentee.communicationPreference);
      if (compatible) {
        score += 8;
        reasons.push('Compatible communication styles');
      }
    }
  }
  
  // Availability (10% weight) - Improved logic
  const availabilityScore = getAvailabilityScore(mentor.availability);
  score += availabilityScore;
  if (availabilityScore > 0) {
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