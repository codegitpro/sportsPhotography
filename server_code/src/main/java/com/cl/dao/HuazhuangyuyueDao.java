package com.cl.dao;

import com.cl.entity.HuazhuangyuyueEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.HuazhuangyuyueView;


/**
 * 化妆预约
 * 
 * @author 
 * @email 
 * @date 2026-03-12 19:47:41
 */
public interface HuazhuangyuyueDao extends BaseMapper<HuazhuangyuyueEntity> {
	
	List<HuazhuangyuyueView> selectListView(@Param("ew") Wrapper<HuazhuangyuyueEntity> wrapper);

	List<HuazhuangyuyueView> selectListView(Pagination page,@Param("ew") Wrapper<HuazhuangyuyueEntity> wrapper);
	
	HuazhuangyuyueView selectView(@Param("ew") Wrapper<HuazhuangyuyueEntity> wrapper);


    List<Map<String, Object>> selectValue(@Param("params") Map<String, Object> params,@Param("ew") Wrapper<HuazhuangyuyueEntity> wrapper);

    List<Map<String, Object>> selectTimeStatValue(@Param("params") Map<String, Object> params,@Param("ew") Wrapper<HuazhuangyuyueEntity> wrapper);

    List<Map<String, Object>> selectGroup(@Param("params") Map<String, Object> params,@Param("ew") Wrapper<HuazhuangyuyueEntity> wrapper);



}
