// =============================================
// FILE: src/app/page.tsx
// DESCRIPTION: Home page for Uploadthing server
// =============================================

export default function Home() {
  return (
    <div style={{ 
      padding: "2rem", 
      fontFamily: "system-ui, sans-serif",
      maxWidth: "600px",
      margin: "0 auto"
    }}>
      <h1>🚀 BestiePals Upload Server</h1>
      <p>
        This is the Uploadthing server for BestiePals photo uploads.
      </p>
      
      <h2>📋 Status</h2>
      <ul>
        <li>✅ Uploadthing v7 configured</li>
        <li>✅ Supabase authentication integration</li>
        <li>✅ Profile photo upload endpoint</li>
        <li>✅ File validation and security</li>
      </ul>

      <h2>🔗 Endpoints</h2>
      <ul>
        <li><code>/api/uploadthing</code> - Main upload endpoint</li>
      </ul>

      <h2>🔧 Configuration</h2>
      <p>
        Make sure to set the following environment variables:
      </p>
      <ul>
        <li><code>UPLOADTHING_TOKEN</code></li>
        <li><code>SUPABASE_URL</code></li>
        <li><code>SUPABASE_ANON_KEY</code></li>
      </ul>
    </div>
  );
}
