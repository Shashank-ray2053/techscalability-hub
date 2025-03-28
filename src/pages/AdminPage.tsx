import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  loadKnowledgeBase, 
  saveKnowledgeBase, 
  addKnowledgeItem, 
  updateKnowledgeItem, 
  deleteKnowledgeItem, 
  resetKnowledgeBase 
} from "@/utils/knowledgeBaseService";
import { 
  loadNotificationSettings, 
  updateNotificationSettings 
} from "@/utils/emailService";
import { KnowledgeItem, KnowledgeCategory } from "@/utils/chatKnowledgeBase";

const AdminPage = () => {
  const { toast } = useToast();
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [adminEmail, setAdminEmail] = useState("shashankray2053@gmail.com");
  const [adminPhone, setAdminPhone] = useState("9844418804");
  
  const [newItem, setNewItem] = useState({
    keywords: "",
    response: "",
    category: "general" as KnowledgeCategory,
  });

  useEffect(() => {
    const kb = loadKnowledgeBase();
    setKnowledgeBase(kb);

    const settings = loadNotificationSettings();
    if (settings.adminEmail !== "shashankray2053@gmail.com") {
      setAdminEmail(settings.adminEmail);
    }
    if (settings.adminPhone !== "9844418804") {
      setAdminPhone(settings.adminPhone);
    } else {
      updateNotificationSettings("shashankray2053@gmail.com", "9844418804");
    }
  }, []);

  const handleAddItem = () => {
    if (!newItem.keywords.trim() || !newItem.response.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both keywords and response.",
        variant: "destructive",
      });
      return;
    }

    try {
      const updatedKB = addKnowledgeItem(newItem);
      setKnowledgeBase(updatedKB);
      setNewItem({
        keywords: "",
        response: "",
        category: "general",
      });
      
      toast({
        title: "Knowledge base updated",
        description: "New item added successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add new item.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateItem = () => {
    if (selectedItemIndex === null) return;
    
    if (!newItem.keywords.trim() || !newItem.response.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both keywords and response.",
        variant: "destructive",
      });
      return;
    }

    try {
      const updatedKB = updateKnowledgeItem(selectedItemIndex, newItem);
      setKnowledgeBase(updatedKB);
      setNewItem({
        keywords: "",
        response: "",
        category: "general",
      });
      setSelectedItemIndex(null);
      
      toast({
        title: "Knowledge base updated",
        description: "Item updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update item.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteItem = (index: number) => {
    try {
      const updatedKB = deleteKnowledgeItem(index);
      setKnowledgeBase(updatedKB);
      
      if (selectedItemIndex === index) {
        setSelectedItemIndex(null);
        setNewItem({
          keywords: "",
          response: "",
          category: "general",
        });
      }
      
      toast({
        title: "Knowledge base updated",
        description: "Item deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item.",
        variant: "destructive",
      });
    }
  };

  const handleResetKnowledgeBase = () => {
    if (window.confirm("Are you sure you want to reset the knowledge base to defaults? This cannot be undone.")) {
      const defaultKB = resetKnowledgeBase();
      setKnowledgeBase(defaultKB);
      
      toast({
        title: "Knowledge base reset",
        description: "Knowledge base has been reset to default values.",
      });
    }
  };

  const handleEditItem = (index: number) => {
    const item = knowledgeBase[index];
    setSelectedItemIndex(index);
    setNewItem({
      keywords: item.keywords.join(", "),
      response: item.response,
      category: item.category,
    });
  };

  const handleCancelEdit = () => {
    setSelectedItemIndex(null);
    setNewItem({
      keywords: "",
      response: "",
      category: "general",
    });
  };

  const handleUpdateNotificationSettings = () => {
    if (!adminEmail) {
      toast({
        title: "Missing information",
        description: "Please provide an email address for notifications.",
        variant: "destructive",
      });
      return;
    }

    try {
      updateNotificationSettings(adminEmail, adminPhone);
      
      toast({
        title: "Settings updated",
        description: "Notification settings saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notification settings.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <Container>
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          <Tabs defaultValue="knowledge">
            <TabsList className="mb-6">
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
              <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="knowledge">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedItemIndex !== null ? "Edit Item" : "Add New Item"}</CardTitle>
                    <CardDescription>
                      {selectedItemIndex !== null 
                        ? "Update the selected knowledge base item" 
                        : "Add a new response to the chat knowledge base"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords (comma separated)</Label>
                      <Input
                        id="keywords"
                        value={newItem.keywords}
                        onChange={(e) => setNewItem({ ...newItem, keywords: e.target.value })}
                        placeholder="e.g. pricing, cost, fees, charges"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newItem.category}
                        onValueChange={(value) => setNewItem({ ...newItem, category: value as KnowledgeCategory })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="pricing">Pricing</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="response">Response</Label>
                      <Textarea
                        id="response"
                        value={newItem.response}
                        onChange={(e) => setNewItem({ ...newItem, response: e.target.value })}
                        placeholder="Enter the response for these keywords"
                        rows={5}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {selectedItemIndex !== null ? (
                      <>
                        <Button variant="outline" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                        <Button onClick={handleUpdateItem}>
                          Update Item
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleAddItem} className="w-full">
                        Add to Knowledge Base
                      </Button>
                    )}
                  </CardFooter>
                </Card>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Knowledge Base Items</CardTitle>
                      <CardDescription>
                        Manage existing chat responses
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="max-h-[500px] overflow-y-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Category</TableHead>
                              <TableHead>Keywords</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {knowledgeBase.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium capitalize">
                                  {item.category}
                                </TableCell>
                                <TableCell className="truncate max-w-[150px]" title={item.keywords.join(", ")}>
                                  {item.keywords.join(", ").substring(0, 30)}
                                  {item.keywords.join(", ").length > 30 ? "..." : ""}
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleEditItem(index)}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => handleDeleteItem(index)}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleResetKnowledgeBase}
                      >
                        Reset to Defaults
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure where form submissions and notifications are sent
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Email for form submissions</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="admin@example.com"
                    />
                    <p className="text-sm text-muted-foreground">Consultation form submissions will be sent to this email address</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="adminPhone">Phone for SMS notifications (optional)</Label>
                    <Input
                      id="adminPhone"
                      type="tel"
                      value={adminPhone}
                      onChange={(e) => setAdminPhone(e.target.value)}
                      placeholder="+1234567890"
                    />
                    <p className="text-sm text-muted-foreground">Optional: receive SMS notifications for new form submissions</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleUpdateNotificationSettings}
                    className="w-full"
                  >
                    Save Notification Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
