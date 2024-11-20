// JudgesHeader.jsx
import Navbar from "./Header";
import { Card, CardTitle } from "@/components/ui/card";
import PropTypes from 'prop-types';

const StatCard = ({ title, value, subtitle }) => {
  return (
    <Card className="p-4 border border-black">
      <CardTitle className="mb-4">{title}</CardTitle>
      <div className="flex items-center gap-2">
        <h3 className="text-4xl font-bold">{value}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </Card>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default function JudgesHeader({ activeTab }) {
    const tagContent = "Admin";
    const menuItems = [
        { label: "Home", to: "/" },
        { label: "Profile", to: "/profile" },
        { label: "Settings", to: "/settings" },
    ];
    
    return (
        <div>
            <article>
                <Navbar tagContent={tagContent} menuItems={menuItems} />
            </article>
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">
                        {activeTab === "dashboard" ? "Judge Dashboard" : "Evaluation History"}
                    </h1>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <StatCard 
                        title="Assigned Startups"
                        value="24" 
                        subtitle="4 remaining today"
                    />
                    <StatCard 
                        title="Next Pitch"
                        value="8" 
                        subtitle="All assigned"
                    />
                    <StatCard
                        title="Todays schedule" 
                        value="12" 
                        subtitle="Next 24 hours"
                    />
                    <StatCard 
                        title="Completed Evaluations"
                        value="8" 
                        subtitle="2 Pending Review"
                    />
                </div>
            </div>
        </div>
    );
}

JudgesHeader.propTypes = {
    activeTab: PropTypes.string.isRequired,
};