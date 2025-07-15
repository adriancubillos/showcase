import FormValidation from './technical/FormValidation';
import PerformanceDemo from './technical/PerformanceDemo';

const TechnicalShowcase = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Validation */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Form Validation</h3>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <FormValidation />
          </div>
        </div>

        {/* Performance Demo */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Performance Optimizations</h3>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <PerformanceDemo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalShowcase;
