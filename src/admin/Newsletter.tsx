import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { adminAPI } from "../shared/services/adminAPI";

export default function Newsletter() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await adminAPI.getCustomers();
        setCustomers(data.customers || []);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  const handleSelectAll = () => {
    if (selectedCustomers.length === customers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customers.map(c => c.email));
    }
  };

  const handleCustomerSelect = (email: string) => {
    setSelectedCustomers(prev => 
      prev.includes(email) 
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  const sendNewsletter = async () => {
    if (!subject || !content || selectedCustomers.length === 0) {
      setMessage("Please fill all fields and select at least one customer");
      return;
    }

    setSending(true);
    try {
      await adminAPI.sendNewsletter({
        subject,
        content,
        recipients: selectedCustomers
      });
      setMessage(`Newsletter sent to ${selectedCustomers.length} customers successfully!`);
      setSubject("");
      setContent("");
      setSelectedCustomers([]);
    } catch (error) {
      setMessage("Failed to send newsletter");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-6 lg:ml-56">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Newsletter</h2>
          <p className="text-gray-600 mt-1">Send marketing emails to customers</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Newsletter Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold mb-4">Create Newsletter</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Newsletter subject..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Newsletter content (HTML supported)..."
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {selectedCustomers.length} customers selected
                </span>
                <button
                  onClick={sendNewsletter}
                  disabled={sending || selectedCustomers.length === 0}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending...' : 'Send Newsletter'}
                </button>
              </div>
            </div>
          </div>

          {/* Customer Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Select Recipients</h3>
              <button
                onClick={handleSelectAll}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                {selectedCustomers.length === customers.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto space-y-2">
              {customers.map((customer) => (
                <div key={customer._id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.email)}
                    onChange={() => handleCustomerSelect(customer.email)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    <div className="text-sm text-gray-500">{customer.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}