export default function Dashboard() {
	return (
		<>
			<div className="flex flex-col p-8">
				<p className="text-3xl font-bold">Dashboard</p>
			</div>

			<div className="flex flex-col w-full p-8">
				<div className="grid grid-cols-2 grid-rows-1 gap-8">
					<div class="flex flex-col bg-white border shadow-sm rounded-xl">
						<div class="p-4 md:p-7">
							<h3 class="text-lg font-bold text-gray-800">
								Account Verification
							</h3>
							<ul class="flex flex-col justify-end text-start -space-y-px mt-4">
								<li class="flex items-center gap-x-2 p-3 text-sm bg-white border text-gray-800 first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-gray-200">
									<div class="w-full flex justify-between truncate">
										<span class="me-3 flex-1 w-0 truncate">Davion Eldersword</span>
										<span class="flex items-center gap-x-2 text-gray-500 whitespace-nowrap">
											Bus driver
										</span>
									</div>
								</li>
								<li class="flex items-center gap-x-2 p-3 text-sm bg-white border text-gray-800 first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-gray-200">
									<div class="w-full flex justify-between truncate">
										<span class="me-3 flex-1 w-0 truncate">Mortred Vaelsheim</span>
										<span class="flex items-center gap-x-2 text-gray-500 whitespace-nowrap">
											Bus driver
										</span>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="flex flex-col bg-white border shadow-sm rounded-xl">
						<div class="p-4 md:p-7">
							<h3 class="text-lg font-bold text-gray-800">Chart here</h3>
							<p class="mt-2 text-gray-500">TBD</p>
						</div>
					</div>
					<div class="flex flex-col col-span-2 bg-white border shadow-sm rounded-xl">
						<div class="p-4 md:p-7">
							<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
								<thead>
									<tr>
										<th
											scope="col"
											class="px-6 py-3 text-start text-lg font-bold text-gray-800 uppercase"
										>
											Fullname
										</th>
										<th
											scope="col"
											class="px-6 py-3 text-start text-lg font-bold text-gray-800 uppercase"
										>
											Position
										</th>
										<th
											scope="col"
											class="px-6 py-3 text-start text-lg font-bold text-gray-800 uppercase"
										>
											Hired Date
										</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
									<tr>
										<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
											Rizzrak Timberthaw
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
											Bus driver
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
											8/27/23
										</td>
									</tr>
									<tr>
										<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                            Magnus Magnazaur
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
											Bus driver
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
											2/19/23
										</td>
									</tr>
									<tr>
										<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                            Puck Faerrer
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
											Bus driver
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
											1/14/23
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
