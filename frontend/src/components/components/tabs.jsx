import { Tabs, TabsList, TabsTrigger, TabsContent } from "@shadcn/ui";

const CustomTabs = () => {
  return (
    <Tabs defaultValue="startups" className="w-full">
      {/* Tab List */}
      <TabsList>
        <TabsTrigger value="startups">Startups</TabsTrigger>
        <TabsTrigger value="judges">Judges</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
        <TabsTrigger value="rounds">Rounds</TabsTrigger>
        <TabsTrigger value="results">ResultsDashboard</TabsTrigger>
      </TabsList>

      {/* Tabs Content */}
      <TabsContent value="startups">
        <div>
          {/* Insert JSX Element for Startups */}
        </div>
      </TabsContent>

      <TabsContent value="judges">
        <div>
          {/* Insert JSX Element for Judges */}
        </div>
      </TabsContent>

      <TabsContent value="schedule">
        <div>
          {/* Insert JSX Element for Schedule */}
        </div>
      </TabsContent>

      <TabsContent value="rounds">
        <div>
          {/* Insert JSX Element for Rounds */}
        </div>
      </TabsContent>

      <TabsContent value="results">
        <div>
          {/* Insert JSX Element for ResultsDashboard */}
          
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CustomTabs;
