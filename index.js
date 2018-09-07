import { AnalysisWebWorker, AnalysisWorkerWrapper, createWorker } from "./src/worker";
import * as assessments from "./src/assessments";
import * as bundledPlugins from "./src/bundledPlugins";
import * as helpers from "./src/helpers";
import * as markers from "./src/markers";
import * as string from "./src/stringProcessing";
import * as interpreters from "./src/interpreters";
import * as config from "./src/config";

import App from "./src/app";
import Assessor from "./src/assessor";
import ContentAssessor from "./src/contentAssessor";
import TaxonomyAssessor from "./src/taxonomyAssessor";
import Pluggable from "./src/pluggable";
import Researcher from "./src/researcher";
import SnippetPreview from "./src/snippetPreview";
import Paper from "./src/values/Paper";
import AssessmentResult from "./src/values/AssessmentResult";

export {
	App,
	Assessor,
	ContentAssessor,
	TaxonomyAssessor,
	Pluggable,
	Researcher,
	SnippetPreview,

	Paper,
	AssessmentResult,

	AnalysisWebWorker,
	AnalysisWorkerWrapper,
	createWorker,
};

export default {
	assessments,
	bundledPlugins,
	config,
	helpers,
	markers,
	string,
	interpreters,
};
