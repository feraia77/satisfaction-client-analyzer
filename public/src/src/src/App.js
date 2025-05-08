import { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, Settings, MessageSquare, TrendingUp, Clock, ShoppingBag, Truck, HeartHandshake, Search, Star, RefreshCw, Download, Link, ArrowRight } from 'lucide-react';

// Couleurs pour les visualisations
const COLORS = ['#4CAF50', '#FFC107', '#F44336'];
const THEME_COLORS = ['#3F51B5', '#2196F3', '#00BCD4', '#009688', '#4CAF50', '#8BC34A'];

export default function SatisfactionClientAnalyzer() {
  const [inputData, setInputData] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [example, setExample] = useState('');
  const [activeTab, setActiveTab] = useState('manual');
  const [searchQuery, setSearchQuery] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [reviewsSource, setReviewsSource] = useState('google');
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [importedData, setImportedData] = useState('');

  // Exemples prédéfinis pour démonstration
  const examples = {
    exemple1: `Marie D.: "J'ai commandé un produit il y a 3 semaines et je n'ai toujours rien reçu. Le service client ne répond pas à mes emails."
Jean L.: "Très satisfait de mon achat. Le produit est de bonne qualité et la livraison a été rapide."
Sophie M.: "La qualité est correcte mais le délai de livraison était plus long que prévu."
Thomas B.: "Excellente expérience d'achat ! Le service client a été très réactif quand j'ai eu une question."
Lucie F.: "Produit conforme à la description mais l'emballage était endommagé à la réception."`,
    exemple2: `Avis Google: "Service impeccable, je recommande vivement cette entreprise !" (5 étoiles)
Commentaire Facebook: "Déçu par la qualité du service, j'attendais mieux pour ce prix." (2 étoiles)
Email client: "Bonjour, je voudrais vous remercier pour votre réactivité suite à mon problème de commande."
Enquête satisfaction: "Niveau de satisfaction général: 7/10. Points à améliorer: temps d'attente téléphonique"
Message Instagram: "Vos produits sont super mais les frais de livraison sont trop élevés"`,
  };

  // Fonction pour analyser les données
  const analyzeData = () => {
    if (!inputData.trim()) return;
    
    setIsLoading(true);
    
    // Simulation d'un traitement d'analyse
    setTimeout(() => {
      const feedbacks = inputData.split('\n').filter(item => item.trim() !== '');
      
      // Analyse de sentiment
      const sentiments = feedbacks.map(feedback => {
        const lowerFeedback = feedback.toLowerCase();
        let sentiment = 'neutre';
        let justification = '';
        
        // Mots clés positifs
        if (lowerFeedback.match(/excellent|très satisfait|super|impeccable|génial|recommande|réactif|bonne qualité|rapide|merci/)) {
          sentiment = 'positif';
          
          if (lowerFeedback.includes('excellent')) justification = 'Utilisation du terme "excellent"';
          else if (lowerFeedback.includes('très satisfait')) justification = 'Expression de satisfaction explicite';
          else if (lowerFeedback.includes('recommande')) justification = 'Recommandation du service/produit';
          else if (lowerFeedback.includes('réactif')) justification = 'Mention positive de la réactivité';
          else justification = 'Termes positifs utilisés';
        }
        // Mots clés négatifs
        else if (lowerFeedback.match(/déçu|problème|pas reçu|ne répond pas|trop long|endommagé|mauvais|attente|défectueux/)) {
          sentiment = 'négatif';
          
          if (lowerFeedback.includes('déçu')) justification = 'Expression de déception';
          else if (lowerFeedback.includes('problème')) justification = 'Mention d\'un problème spécifique';
          else if (lowerFeedback.includes('pas reçu')) justification = 'Non-réception de commande';
          else if (lowerFeedback.includes('ne répond pas')) justification = 'Manque de réponse du service client';
          else justification = 'Termes négatifs utilisés';
        }
        // Neutres ou avec termes mitigés
        else {
          justification = 'Absence de termes fortement positifs ou négatifs';
          
          if (lowerFeedback.includes('correcte') || lowerFeedback.includes('conforme')) {
            justification = 'Satisfaction basique sans enthousiasme particulier';
          }
        }
        
        return { text: feedback, sentiment, justification };
      });
      
      // Statistiques des sentiments
      const sentimentStats = {
        positif: sentiments.filter(item => item.sentiment === 'positif').length,
        neutre: sentiments.filter(item => item.sentiment === 'neutre').length,
        négatif: sentiments.filter(item => item.sentiment === 'négatif').length
      };
      
      // Identification des thèmes
      const themeIdentification = [];
      const serviceClient = feedbacks.filter(item => 
        item.toLowerCase().includes('service client') || 
        item.toLowerCase().includes('support') || 
        item.toLowerCase().includes('réponse') || 
        item.toLowerCase().includes('réactif')
      ).length;
      
      const qualiteProduit = feedbacks.filter(item => 
        item.toLowerCase().includes('qualité') || 
        item.toLowerCase().includes('produit') || 
        item.toLowerCase().includes('conforme')
      ).length;
      
      const delaiLivraison = feedbacks.filter(item => 
        item.toLowerCase().includes('livraison') || 
        item.toLowerCase().includes('délai') || 
        item.toLowerCase().includes('attente') || 
        item.toLowerCase().includes('reçu')
      ).length;
      
      const prixTarifs = feedbacks.filter(item => 
        item.toLowerCase().includes('prix') || 
        item.toLowerCase().includes('cher') || 
        item.toLowerCase().includes('tarif') || 
        item.toLowerCase().includes('coût')
      ).length;
      
      const interfaceUtilisation = feedbacks.filter(item => 
        item.toLowerCase().includes('interface') || 
        item.toLowerCase().includes('utilisation') || 
        item.toLowerCase().includes('site') || 
        item.toLowerCase().includes('application')
      ).length;
      
      const sav = feedbacks.filter(item => 
        item.toLowerCase().includes('après-vente') || 
        item.toLowerCase().includes('retour') || 
        item.toLowerCase().includes('garantie') || 
        item.toLowerCase().includes('remboursement')
      ).length;
      
      themeIdentification.push({ name: 'Service client', value: serviceClient });
      themeIdentification.push({ name: 'Qualité produit', value: qualiteProduit });
      themeIdentification.push({ name: 'Délai livraison', value: delaiLivraison });
      themeIdentification.push({ name: 'Prix/Tarifs', value: prixTarifs });
      themeIdentification.push({ name: 'Interface/Utilisation', value: interfaceUtilisation });
      themeIdentification.push({ name: 'SAV', value: sav });
      
      // Filtrer les thèmes qui ont une valeur > 0
      const filteredThemes = themeIdentification.filter(theme => theme.value > 0);
      
      // Recommandations basées sur l'analyse
      let recommendations = [];
      
      if (sentimentStats.négatif > sentimentStats.positif) {
        recommendations.push("Mettre en place un système de suivi plus rigoureux des retours clients négatifs");
      }
      
      if (serviceClient > 0 && sentiments.some(s => s.sentiment === 'négatif' && s.text.toLowerCase().includes('service client'))) {
        recommendations.push("Améliorer la réactivité du service client, potentiellement en mettant en place un système de réponse automatique pour accuser réception des demandes");
      }
      
      if (delaiLivraison > 0 && sentiments.some(s => s.sentiment === 'négatif' && (s.text.toLowerCase().includes('livraison') || s.text.toLowerCase().includes('délai')))) {
        recommendations.push("Optimiser le processus logistique pour réduire les délais de livraison et communiquer de manière plus transparente sur les délais réels");
      }
      
      if (qualiteProduit > 0 && sentiments.some(s => s.sentiment === 'négatif' && s.text.toLowerCase().includes('qualité'))) {
        recommendations.push("Revoir les processus de contrôle qualité et envisager de solliciter davantage de retours spécifiques sur les produits problématiques");
      }
      
      if (prixTarifs > 0) {
        recommendations.push("Communiquer plus clairement sur la valeur ajoutée des produits/services pour justifier les tarifs ou envisager des offres promotionnelles ciblées");
      }
      
      // Si peu de recommandations, ajouter des recommandations génériques
      if (recommendations.length < 2) {
        recommendations.push("Mettre en place un programme de fidélité pour récompenser les clients satisfaits");
        recommendations.push("Développer une stratégie de collecte de témoignages plus systématique pour identifier rapidement les points d'amélioration");
      }
      
      // Préparation des données pour les graphiques
      const sentimentChartData = [
        { name: 'Positif', value: sentimentStats.positif },
        { name: 'Neutre', value: sentimentStats.neutre },
        { name: 'Négatif', value: sentimentStats.négatif },
      ];
      
      setAnalysisResults({
        sentiments,
        sentimentStats,
        themeIdentification: filteredThemes,
        recommendations,
        sentimentChartData
      });
      
      setIsLoading(false);
    }, 1500);
  };

  const loadExample = (exampleKey) => {
    setInputData(examples[exampleKey]);
    setExample(exampleKey);
  };

  // Fonction pour simuler la recherche d'avis en ligne
  const searchOnlineReviews = () => {
    if (!businessName.trim()) {
      alert('Veuillez saisir le nom de votre entreprise');
      return;
    }
    
    setSearchLoading(true);
    
    // Simulation d'une recherche d'avis
    setTimeout(() => {
      // Génération de faux avis pour la démonstration
      const sources = {
        google: [
          { text: `${businessName} offre un excellent service ! Très satisfait de ma visite.`, rating: 5, source: 'Google', date: '2025-04-28' },
          { text: `Bonne expérience chez ${businessName}, mais les prix sont un peu élevés.`, rating: 4, source: 'Google', date: '2025-04-25' },
          { text: `Personnel agréable chez ${businessName}, mais délai d'attente trop long.`, rating: 3, source: 'Google', date: '2025-04-20' },
          { text: `J'ai adoré mon expérience chez ${businessName}. Je recommande vivement.`, rating: 5, source: 'Google', date: '2025-04-15' },
          { text: `Déçu par la qualité du service chez ${businessName}. Ne reviendrai pas.`, rating: 2, source: 'Google', date: '2025-04-10' },
          { text: `${businessName} a dépassé mes attentes. Service client exceptionnel.`, rating: 5, source: 'Google', date: '2025-04-05' },
        ],
        facebook: [
          { text: `Super expérience chez ${businessName} aujourd'hui !`, rating: 5, source: 'Facebook', date: '2025-04-29' },
          { text: `${businessName} pourrait améliorer son service après-vente.`, rating: 3, source: 'Facebook', date: '2025-04-22' },
          { text: `Produits de qualité chez ${businessName}, mais livraison lente.`, rating: 4, source: 'Facebook', date: '2025-04-18' },
          { text: `Très déçu de ma commande chez ${businessName}.`, rating: 1, source: 'Facebook', date: '2025-04-12' },
        ],
        trustpilot: [
          { text: `${businessName} propose un excellent rapport qualité-prix.`, rating: 5, source: 'Trustpilot', date: '2025-04-30' },
          { text: `Livraison rapide et bon service client chez ${businessName}.`, rating: 4, source: 'Trustpilot', date: '2025-04-26' },
          { text: `Commande incomplète chez ${businessName} et difficile d'obtenir un remboursement.`, rating: 2, source: 'Trustpilot', date: '2025-04-14' },
        ]
      };
      
      setSearchResults(sources[reviewsSource]);
      setSearchLoading(false);
    }, 1500);
  };
  
  const importReviews = () => {
    if (!searchResults) return;
    
    const formattedReviews = searchResults.map(review => `${review.source} (${review.rating}★): "${review.text}"`).join('\n');
    
    if (inputData.trim() !== '') {
      // Ajouter aux données existantes
      setInputData(inputData + '\n' + formattedReviews);
    } else {
      // Pas de données existantes
      setInputData(formattedReviews);
    }
    
    setImportedData(formattedReviews);
    
    // Retourner à l'onglet manuel
    setActiveTab('manual');
  };

  return (
    <div className="flex flex-col p-4 min-h-screen bg-gray-50">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Analyseur de Satisfaction Client - Simplifia</h1>
        <p className="text-gray-600">Analysez vos retours clients et obtenez des recommandations personnalisées</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow">
          {/* Onglets pour les différentes méthodes d'entrée */}
          <div className="flex border-b mb-4">
            <button 
              onClick={() => setActiveTab('manual')} 
              className={`py-2 px-4 font-medium ${activeTab === 'manual' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            >
              Saisie Manuelle
            </button>
            <button 
              onClick={() => setActiveTab('search')} 
              className={`py-2 px-4 font-medium ${activeTab === 'search' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            >
              Rechercher des Avis
            </button>
          </div>
          
          {activeTab === 'manual' ? (
            <>
              <h2 className="text-lg font-semibold mb-3 flex items-center text-blue-700">
                <MessageSquare className="w-5 h-5 mr-2" />
                Retours clients à analyser
              </h2>
              <div className="mb-4">
                <div className="flex gap-2 mb-3">
                  <button 
                    onClick={() => loadExample('exemple1')} 
                    className={`px-3 py-1 text-sm rounded ${example === 'exemple1' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  >
                    Exemple 1
                  </button>
                  <button 
                    onClick={() => loadExample('exemple2')} 
                    className={`px-3 py-1 text-sm rounded ${example === 'exemple2' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  >
                    Exemple 2
                  </button>
                </div>
                <textarea
                  className="w-full h-64 p-3 border rounded-md"
                  placeholder="Collez ici vos retours clients (un par ligne). Exemples : emails, avis, commentaires sur les réseaux sociaux, résultats d'enquêtes..."
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                />
              </div>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
                onClick={analyzeData}
                disabled={isLoading}
              >
                {isLoading ? 'Analyse en cours...' : 'Analyser les données'}
              </button>
              
              {importedData && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-700 flex items-center mb-2">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Avis importés avec succès
                  </p>
                  <p className="text-xs text-gray-500">
                    {searchResults?.length || 0} avis ont été ajoutés à votre analyse
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-3 flex items-center text-blue-700">
                <Search className="w-5 h-5 mr-2" />
                Rechercher des Avis en Ligne
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de votre entreprise
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Ex: Simplifia"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source des avis
                </label>
                <select
                  className="w-full p-2 border rounded-md bg-white"
                  value={reviewsSource}
                  onChange={(e) => setReviewsSource(e.target.value)}
                >
                  <option value="google">Google Business</option>
                  <option value="facebook">Facebook</option>
                  <option value="trustpilot">Trustpilot</option>
                </select>
              </div>
              
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center mb-4"
                onClick={searchOnlineReviews}
                disabled={searchLoading}
              >
                {searchLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Recherche en cours...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Rechercher les avis
                  </>
                )}
              </button>
              
              {searchResults && (
                <div className="border rounded-md">
                  <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                    <h3 className="font-medium text-sm">Résultats ({searchResults.length} avis)</h3>
                    <button
                      className="text-blue-600 text-sm font-medium flex items-center"
                      onClick={importReviews}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Importer
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto p-2 space-y-2">
                    {searchResults.map((review, index) => (
                      <div key={index} className="border rounded p-2 bg-white">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-sm">{review.text}</p>
                        <div className="flex items-center mt-1">
                          <Link className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">{review.source}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {analysisResults && (
          <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-blue-700">
              <TrendingUp className="w-5 h-5 mr-2" />
              Synthèse visuelle
            </h2>
            
            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Répartition des sentiments</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={analysisResults.sentimentChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {analysisResults.sentimentChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-2">Thèmes identifiés</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={analysisResults.themeIdentification}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{fontSize: 12}} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" name="Fréquence">
                    {analysisResults.themeIdentification.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={THEME_COLORS[index % THEME_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {analysisResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3 flex items-center text-blue-700">
              <Settings className="w-5 h-5 mr-2" />
              Analyse détaillée des sentiments
            </h2>
            <div className="space-y-3">
              {analysisResults.sentiments.map((item, index) => (
                <div key={index} className={`p-3 rounded-md ${
                  item.sentiment === 'positif' ? 'bg-green-50 border-l-4 border-green-500' : 
                  item.sentiment === 'négatif' ? 'bg-red-50 border-l-4 border-red-500' : 
                  'bg-yellow-50 border-l-4 border-yellow-500'
                }`}>
                  <div className="font-medium flex items-center">
                    {item.sentiment === 'positif' ? (
                      <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                    ) : item.sentiment === 'négatif' ? (
                      <AlertCircle className="w-4 h-4 mr-1 text-red-500" />
                    ) : (
                      <Clock className="w-4 h-4 mr-1 text-yellow-500" />
                    )}
                    {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                  </div>
                  <div className="text-sm text-gray-700 mt-1">{item.text}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    <span className="font-medium">Justification :</span> {item.justification}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-blue-700">
              <TrendingUp className="w-5 h-5 mr-2" />
              Points d'amélioration recommandés
            </h2>
            <div className="space-y-3">
              {analysisResults.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start p-3 bg-blue-50 rounded-md">
                  <div className="mr-3 mt-1 text-blue-600">
                    {index === 0 ? <HeartHandshake className="w-5 h-5" /> : 
                     index === 1 ? <Truck className="w-5 h-5" /> :
                     index === 2 ? <ShoppingBag className="w-5 h-5" /> :
                     <Settings className="w-5 h-5" />}
                  </div>
                  <div>{recommendation}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-gray-100 rounded-md">
              <h3 className="text-md font-medium mb-2">Actions prioritaires</h3>
              <p className="text-sm">
                Basé sur l'analyse, concentrez-vous sur 
                {analysisResults.themeIdentification.length > 0 && 
                  ` "${analysisResults.themeIdentification.sort((a, b) => b.value - a.value)[0].name}"`}
                {analysisResults.sentimentStats.négatif > 0 && 
                  ` qui génère le plus d'insatisfaction.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {!analysisResults && !isLoading && (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <MessageSquare className="w-12 h-12 mx-auto text-blue-500 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Comment utiliser cet outil ?</h2>
          <ol className="text-left text-gray-700 space-y-2 max-w-xl mx-auto">
            <li>1. Collez vos retours clients dans la zone de texte (un retour par ligne)</li>
            <li>2. Cliquez sur "Analyser les données"</li>
            <li>3. Consultez l'analyse détaillée des sentiments et thèmes</li>
            <li>4. Exploitez les recommandations personnalisées</li>
          </ol>
          <p className="mt-4 text-gray-500">Vous pouvez aussi essayer l'un des exemples prédéfinis</p>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-blue-600 font-medium">Analyse en cours...</p>
        </div>
      )}

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© 2025 Simplifia - Analyseur de Satisfaction Client</p>
      </footer>
    </div>
  );
}
