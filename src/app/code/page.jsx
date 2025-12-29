import fs from 'fs';
import path from 'path';
import SafeImage from '../../components/SafeImage';

function resolveThumbnailSrc(thumbnail) {
  if (!thumbnail) return null;
  // Allow absolute/remote thumbnails (e.g. GitHub OpenGraph URLs)
  if (/^(https?:)?\/\//.test(thumbnail)) return thumbnail;
  return `/${String(thumbnail).replace(/^\/+/, '')}`;
}

async function getData() {
  const reposPath = path.join(process.cwd(), 'public/assets/data/github-repos.generated.json');
  const projectsPath = path.join(process.cwd(), 'public/assets/data/projects.json');
  
  // Repos might not exist if not built
  let repos = [];
  try {
    if (fs.existsSync(reposPath)) {
      repos = JSON.parse(fs.readFileSync(reposPath, 'utf8'));
    }
  } catch (e) {
    console.warn('Repos data not found or invalid');
  }

  const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  
  return { repos, projects };
}

export const metadata = {
  title: 'Code - Sahar Mor',
  description: 'Open source repositories and personal projects by Sahar Mor.',
};

export default async function Code() {
  const { repos, projects } = await getData();

  return (
    <>
      <section className="hero">
        <h1>Code</h1>
        <p>Open source repositories and personal projects.</p>
      </section>

      <section id="open-source">
        <h2>Open Source</h2>
        {repos.length === 0 ? (
          <p>Repos data not available. Run <code>npm run build:data</code> to generate.</p>
        ) : (
          <div className="card-grid" id="repos-grid">
            {repos.map((repo) => {
              const thumbSrc = resolveThumbnailSrc(repo.thumbnail);

              return (
                <a key={repo.url || repo.name} className="card" href={repo.url} target="_blank" rel="noopener noreferrer">
                  {thumbSrc && (
                    <SafeImage
                      src={thumbSrc}
                      alt={`${repo.name} project thumbnail`}
                      className="card-thumbnail"
                      loading="lazy"
                    />
                  )}

                  <div className="card-title">{repo.name}</div>

                  <div className="card-description">{repo.description || 'No description available'}</div>
                </a>
              );
            })}
          </div>
        )}
      </section>

      <section id="projects">
        <h2>Projects</h2>
        <div className="card-grid" id="projects-grid">
          {projects.map((project, index) => {
            const projectThumbSrc = resolveThumbnailSrc(project.thumbnail);
            return (
              <a key={index} className="card" href={project.url} target="_blank" rel="noopener noreferrer">
                {projectThumbSrc && (
                  <SafeImage
                    src={projectThumbSrc}
                    alt={`${project.title} project thumbnail`}
                    className="card-thumbnail"
                    loading="lazy"
                  />
                )}
                <div className="card-title">{project.title}</div>
                <div className="card-description">{project.description}</div>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}

