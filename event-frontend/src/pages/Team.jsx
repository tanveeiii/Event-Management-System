import React from 'react'
import { useEffect } from 'react';

const Team = () => {
  const teamListURL = 'http://localhost:8000/api/team/'
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(teamListURL);
        console.log(response)
        const teamData = await response.json();
        console.log(teamData);
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };
    fetchTeam();
  }, []);
  return (
    <div>Team</div>
  )
}

export default Team