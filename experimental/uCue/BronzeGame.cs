using System
public class BronzeGame
{
    public static 
    public static void LoadBronzeLevels()
	{
		var gameFilename = Application.streamingAssetsPath + "/data/BronzeLevels.json";
		if (File.Exists(gameFilename))
		{
			var json = File.ReadAllText(gameFilename);
			BronzeGames = JsonUtility.FromJson<Games>(json);
			CurrentLevel = Level.Bronze;
		}
		else
		{
			throw new FileNotFoundException();
		}

	}

}