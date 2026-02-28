
import { Sidebar } from './components/editor/Sidebar';
import { Download, FileDown, Upload, RefreshCw } from 'lucide-react';
import { useResumeStore } from './store/useResumeStore';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { ResumePDF } from './components/preview/ResumePDF';

import { useDebounce } from './hooks/useDebounce';

function App() {
  const { resumes, selectedResumeId, setResume, resetResume } = useResumeStore();
  const resume = resumes.find(r => r.id === selectedResumeId);
  const debouncedResume = useDebounce(resume, 1000);

  const handleExportJSON = () => {
    if (!resume) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "resume_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        // Basic validation could go here
        setResume(parsedData);
      } catch (error) {
        console.error("Invalid JSON file", error);
        alert("Failed to parse JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex h-screen bg-[#242424] text-white font-sans overflow-hidden">
      {/* Left Sidebar - Editor */}
      <aside className="w-[400px] shrink-0 h-full z-10 shadow-xl">
        <Sidebar />
      </aside>

      {/* Main Content - Preview & Toolbar */}
      <div className="flex-1 flex flex-col h-full bg-gray-900 relative">
        {/* Toolbar */}
        <div className="h-16 bg-[#1a1a1a] border-b border-white/10 flex items-center justify-between px-6 shrink-0 z-20">
          <div className="text-sm font-medium text-gray-400">
            Live Preview
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded cursor-pointer text-sm transition-colors border border-white/10">
              <Upload size={16} /> Import JSON
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
            <button onClick={handleExportJSON} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded cursor-pointer text-sm transition-colors border border-white/10">
              <FileDown size={16} /> Export JSON
            </button>
            <button onClick={resetResume} className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded cursor-pointer text-sm transition-colors border border-red-500/20">
              <RefreshCw size={16} /> Reset
            </button>

            {debouncedResume && (
              <PDFDownloadLink
                document={<ResumePDF resume={debouncedResume} />}
                fileName={`${debouncedResume.profile.fullName.replace(' ', '_')}_Resume.pdf`}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded text-sm transition-colors shadow-lg shadow-blue-900/20"
              >
                {({ loading }) => (
                  <>
                    <Download size={16} /> {loading ? 'Preparing...' : 'Download PDF'}
                  </>
                )}
              </PDFDownloadLink>
            )}
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto bg-gray-800/50 p-8 flex flex-col items-center gap-8">
          {/* <ResumePreview ref={previewRef} /> */}

          {debouncedResume && (
            <div className="w-[210mm] h-[297mm] shadow-2xl shrink-0">
              <PDFViewer width="100%" height="100%" className="rounded-lg" showToolbar={false}>
                <ResumePDF resume={debouncedResume} />
              </PDFViewer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
