
import React from 'react';
import DashboardCards from '../components/DashboardCards';
import student from '../assets/student.svg';
import cadre from '../assets/cadre.svg';
import licenta from '../assets/licenta.svg';
import master from '../assets/master.svg';

function DashboardCardList({ counts }) {
  return (
    <div className="row">
      <DashboardCards
        title="Studenti"
        count={counts.students}
        imageSrc={student}
        imageAlt="Student Icon"
      />
      <DashboardCards
        title="Profesori"
        count={counts.profesori}
        imageSrc={cadre}
        imageAlt="Professor Icon"
        imageWidth="64px"
      />
      <DashboardCards
        title="Licenta"
        count={counts.licenta}
        imageSrc={licenta}
        imageAlt="Licenta Icon"
      />
      <DashboardCards
        title="Master"
        count={counts.master}
        imageSrc={master}
        imageAlt="Master Icon"
      />
    </div>
  );
}

export default DashboardCardList;
