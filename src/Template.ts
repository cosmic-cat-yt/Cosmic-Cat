import { CosmicCat } from "@/main";

import errorNotFound from "@/Templates/errorNotFound";
import Alerts from "@/Templates/Alerts";
import BrowseMain from "@/Templates/Browse/Main";
import BrowseSubnav from "@/Templates/Browse/Subnav";
import BrowseContent from "@/Templates/Browse/Content";
import Channels3Main from "@/Templates/Channel/Channels3/Main";
import Channels3Header from "@/Templates/Channel/Channels3/Header";
import Channels3Content from "@/Templates/Channel/Channels3/Content";
import Channels3PrimaryPaneFeatured from "@/Templates/Channel/Channels3/primaryPane/featured";
import Channels3PrimaryPaneBrowseVideos from "@/Templates/Channel/Channels3/primaryPane/browseVideos";
import Channels3SecondaryPane from "@/Templates/Channel/Channels3/secondaryPane";
import Channels3CreatorBar from "@/Templates/Channel/Channels3/creatorBar";
import Channels2Main from "@/Templates/Channel/Channels2/Main";
import Channels2PlaylistNavigator from "@/Templates/Channel/Channels2/playlistNavigator";
import Channels2ModuleContainer from "@/Templates/Channel/Channels2/moduleContainer";
import Channels2Stylesheet from "@/Templates/Channel/Channels2/Stylesheet";
import Channels1 from "@/Templates/Channel/Channels1";
import Playlist from "@/Templates/Playlist";
import Search from "@/Templates/Search";
import Masthead from "@/Templates/Masthead";
import Footer from "@/Templates/Footer";
import Homepage from "@/Templates/Homepage";
import Settings from "@/Templates/Settings";
import Buttons from "@/Templates/Buttons";
import Watch from "@/Templates/Watch";
import Comments from "@/Templates/Comments";
import supportedBrowsers from "@/Templates/supportedBrowsers";
import TransSatanJumpscare from "@/Templates/TransSatanJumpscare";

export default class Template {
	private cc: CosmicCat;
	
	constructor(cc: CosmicCat) {
		this.cc = cc;
	}
	
	public errorNotFound = errorNotFound;
	public Alerts = Alerts;
	public Browse = {
		Main: BrowseMain,
		Subnav: BrowseSubnav,
		Content: BrowseContent
	};
	public Comments = Comments;
	public Channels = {
		Channels3: {
			Main: Channels3Main,
			Header: Channels3Header,
			Content: Channels3Content,
			primaryPane: {
				featured: Channels3PrimaryPaneFeatured,
				browseVideos: Channels3PrimaryPaneBrowseVideos
			},
			secondaryPane: Channels3SecondaryPane,
			creatorBar: Channels3CreatorBar
		},
		Channels2: {
			Main: Channels2Main,
			playlistNavigator: Channels2PlaylistNavigator,
			moduleContainer: Channels2ModuleContainer,
			Stylesheet: Channels2Stylesheet
		},
		Channels1: Channels1
	};
	public Playlist = Playlist;
	public Search = Search;
	public Masthead = Masthead;
	public Footer = Footer;
	public Homepage = Homepage;
	public Settings = Settings;
	public Buttons = Buttons;
	public Watch = Watch;
	public supportedBrowsers = supportedBrowsers;
	public TransSatanJumpscare = TransSatanJumpscare;
}